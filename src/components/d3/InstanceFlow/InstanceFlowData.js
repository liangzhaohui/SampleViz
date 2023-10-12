let classes = []
let from = 0
let to = 50
let visibleInstances = new Set(["0061","0091","0143","0245","0277","0279","0302","0323","0332","0356","0367","0399","0412","0418","0426","0434","0438","0456","0515","0565","0607","0637","0669","0671","0676","0688","0690","0739","0790","0811","0825","0829","0862","0866","0878","0882","0898","0916","0957","0986","0995","0024","0033","0085","0128","0158","0262","0275","0483","0518","0551","0649","0749","0779","0817","0828","0910","0924","0224","0831","0863","0488","0652","0792","0819","0321","0641","0673","0168","0232","0238","0525","0631","0063","0068","0184","0320","0586","0727","0945","0950","0343","0640","0903","0046","0078","0121","0256","0432","0453","0695","0845","0042","0421","0457","0598","0834"])
let instanceFilter = "active"
let data=null
let epochs=[]
let instances=[]
let colors=['#d7191c', '#fdae61', '#abdda4', '#2b83ba',"#00d2d5", "#af8d00", "#7f80cd", "#b3e900", "#c42e60", "lightgray","black"]
let MaxInstancesPerPredictionPerClass=0;
let MaxInstancesPerPrediction=0;


const annotateInstanceData = (data) => {
    data.epochs.forEach((epoch, eIndex) => {
        epoch.classifications.forEach((classIndex, cIndex) => {
            // Swap the class-index reference with an actual object for easier processing
            const instance = data.instances[cIndex];
            const classification = {
                predicted: classIndex
            };
            epoch.classifications[cIndex] = classification;
            const isCorrect = (predicted, instance) => {
                return predicted === instance.actual;
            };
            const isWrong = (predicted, instance) => {
                return predicted !== instance.actual && classes.includes(predicted);
            };
            const isOther = (predicted, instance) => {
                return !isCorrect(predicted, instance) && !classes.includes(predicted);
            };
            classification.isCorrect = isCorrect(classification.predicted, instance);
            classification.isWrong = isWrong(classification.predicted, instance);
            classification.isOther = isOther(classification.predicted, instance);

            let _out = false;
            let _in = false;

            // if another epoch exists
            if (data.epochs[eIndex + 1]) {
                // TODO: Here, you are not allowed to use .predicted, as it does not exist yet!
                const predictionInNextEpoch = data.epochs[eIndex + 1].classifications[cIndex];
                _out = classification.predicted !== predictionInNextEpoch;
            }
            // if a previous epoch exists
            if (data.epochs[eIndex - 1]) {
                const classificationInPreviousEpoch = data.epochs[eIndex - 1].classifications[cIndex];
                _in = classification.predicted !== classificationInPreviousEpoch.predicted;
            }

            if (_out && _in) {
                classification.type = "inout";
            } else if (_out) {
                classification.type = "out";
            } else if (_in) {
                classification.type = "in";
            } else {
                classification.type = "stable";
            }
        });
    });
    console.log(data)
    return data;
};

const prepareEpochs = (data, classes, from, to, visibleInstances) => {
    // Select the epochs
    const slicedEpochs = data.epochs.slice(from, to + 1);

    // Update meta information of instances with selected epochs
    prepareInstanceMeta(data);
    annotateInstanceMeta(data, slicedEpochs, visibleInstances);
    // Prepare epoch meta array
    prepareEpochMeta(classes, slicedEpochs);
    annotateEpochMeta(slicedEpochs);
    return slicedEpochs;
};

const prepareInstanceMeta = (data) => {
    data.instances.forEach(instance => {
        instance.score = 0;
        instance.display = false;
    });
};

const annotateInstanceMeta = (data, epochs, visibleInstances) => {
    data.instances.forEach((instance, iIndex) => {
        let wrong = 0, jumps = 0;
        let classesVisited = new Set();
        epochs.forEach((epoch, eIndex) => {
            const classification = epoch.classifications[iIndex];
            // Count incorrect
            if (!classification.isCorrect) wrong++;
            // Count jumps
            if (eIndex + 1 < epochs.length) {
                const type = classification.type;
                if (type === "out" || type === "inout") {
                    jumps++;
                }
            }
            // Count classes visited
            classesVisited.add(classification.predicted);
        });
        instance.classesVisited = classesVisited;
        instance.score = Math.round(wrong / epochs.length * 100) / 100;
        instance.scoreRaw = wrong;
        instance.frequency = Math.round(jumps / (epochs.length - 1) * 100) / 100;
        instance.frequencyRaw = jumps;
        instance.classesVisitedNum = Math.round(classesVisited.size / data.labels.length * 100) / 100;
        if (instanceFilter === "incorrect") {
            instance.displayInFlow = wrong > 0 && classes.includes(instance.actual);
            instance.displayInList = instance.displayInFlow;
        } else if (instanceFilter === "active") {
            instance.displayInFlow = visibleInstances.has(instance.id) && classes.includes(instance.actual);
            instance.displayInList = wrong > 0 && classes.includes(instance.actual);
        } else if (instanceFilter === "all") {
            instance.displayInFlow = classes.includes(instance.actual);
            instance.displayInList = classes.includes(instance.actual);
        }
        instance.display = instance.displayInFlow || instance.displayInList;
        instance.displayInStats = instance.displayInFlow;
    });
};

const prepareEpochMeta = (classes, epochs) => {
    epochs.forEach(epoch => {
        epoch.stats = {};

        const createNewEmptyStatsObj = () => {
            return {
                from: {},
                predicted: {},
                to: {},
                in: { total: 0 },
                inout: { total: 0 },
                out: { total: 0 },
                stable: { total: 0 },
            };
        };

        classes.forEach(classIndex => {
            epoch.stats[classIndex] = createNewEmptyStatsObj();
        });
        epoch.stats[getOtherClassIndex()] = createNewEmptyStatsObj();
    });
};

const annotateEpochMeta = (epochs) => {
    let maxInstancesPerPredictionPerClassTemp = 0;
    let maxInstancesPerPredictionTemp = 0;
    epochs.forEach((epoch, eIndex) => {
        epoch.classifications.forEach((classification, cIndex) => {
            let nextClassification;
            //let previousClassification;
            if (epochs[eIndex + 1])
                nextClassification = epochs[eIndex + 1].classifications[cIndex];
            //if (epochData[eIndex - 1])
            //  previousClassification = epochData[eIndex - 1].classifications[cIndex];

            const instance = data.instances[cIndex];

            if (instance.displayInStats) {
                const instanceStats = epoch.stats[getIncludedOrOtherIndex(classification.predicted)];
                instanceStats.total = (instanceStats.total || 0) + 1;
                if (classes.includes(instance.actual) && maxInstancesPerPredictionTemp < instanceStats.total) {
                    maxInstancesPerPredictionTemp = instanceStats.total;
                }


                instanceStats.predicted[getIncludedOrOtherIndex(instance.actual)] =
                    (instanceStats.predicted[getIncludedOrOtherIndex(instance.actual)] || 0) + 1;
                if (classes.includes(instance.actual) && maxInstancesPerPredictionPerClassTemp < instanceStats.predicted[getIncludedOrOtherIndex(instance.actual)]) {
                    maxInstancesPerPredictionPerClassTemp = instanceStats.predicted[getIncludedOrOtherIndex(instance.actual)];
                }


                if (nextClassification) {
                    if (!instanceStats.to[getIncludedOrOtherIndex(nextClassification.predicted)]) {
                        instanceStats.to[getIncludedOrOtherIndex(nextClassification.predicted)] = {
                            total: 0
                        };
                    }

                    instanceStats.to[getIncludedOrOtherIndex(nextClassification.predicted)][getIncludedOrOtherIndex(instance.actual)] =
                        (instanceStats.to[getIncludedOrOtherIndex(nextClassification.predicted)][getIncludedOrOtherIndex(instance.actual)] || 0) + 1;
                    instanceStats.to[getIncludedOrOtherIndex(nextClassification.predicted)].total++;
                }

                instanceStats[classification.type][getIncludedOrOtherIndex(instance.actual)] =
                    (instanceStats[classification.type][getIncludedOrOtherIndex(instance.actual)] || 0) + 1;
                instanceStats[classification.type].total++;
            }
        });
    });
    MaxInstancesPerPredictionPerClass=maxInstancesPerPredictionPerClassTemp;
    MaxInstancesPerPrediction=maxInstancesPerPredictionTemp;
};
const getIncludedOrOtherIndex = (index) => {
    return (classes.includes(index) ? index : getOtherClassIndex());
};
const getIncludedOrOtherColor = (index) => {
    return (classes.includes(index) ? getColor(index) : getColor(getOtherClassIndex()));
};

const getOtherClassIndex = () => {
    return data.labels.length;
};

const getClassesWithOther = () => {
    if(!data) return [];
    if (classes.length === data.labels.length) return classes;
    const newClasses = [...classes];
    newClasses.splice(parseInt(classes.length / 2), 0, 10);
    return newClasses;
};

const getLabel = (index) => {
    return (data.labels[index] || "Other");
};

const getColor = (index) => {
    return colors[index];
};

const getClasses = () => {
    return classes;
};

const setClasses= (clz) =>{
    classes=clz;
};

const setRange=(f,t)=>{
    from=f
    to=t
}

function instanceFlowData(file_data) {
    visibleInstances=new Set(file_data.instances.map(d=>d.id))
    data=annotateInstanceData(file_data)
    epochs=prepareEpochs(data, classes, from, to, visibleInstances);
    instances=data.instances.map((instance,index)=>{
        instance.index=index;
        return instance;
    })
    .map(instance => {
        instance.visible = visibleInstances.has(instance.id);
        //instance.active = activeInstances.has(instance.id);
        //instance.line = lineInstances.has(instance.id);
        //instance.clicked = clickedInstances.has(instance.id);
        //return instance;
    }).sort();
    let allInstances=data.instances
    instances = allInstances.filter(instance => instance.displayInFlow);

    return {epochs:epochs,instances:instances,allInstances:allInstances,data:data}
}

export {instanceFlowData,getClassesWithOther,getIncludedOrOtherIndex,getColor,getLabel,setClasses,setRange,MaxInstancesPerPredictionPerClass,MaxInstancesPerPrediction};