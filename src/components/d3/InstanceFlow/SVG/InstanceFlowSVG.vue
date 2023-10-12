<template>
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" ref="svg"
        :style="{ width: svgW, height: 80 * classesWithOther.length }">
    </svg>
</template>

<script>
import { MaxInstancesPerPrediction, getClassesWithOther, getIncludedOrOtherIndex, classes, getColor, getLabel } from '../InstanceFlowData'
import * as d3 from "d3";
import ElementResizeDetectorMaker from "element-resize-detector"

export default {
    name: "instanceflowSVG",
    props: ['instances', 'epochs', 'classes', 'classView', 'containerElements'],
    data() {
        return {
            svgBounds: [],
            classesWithOther: [],
            svgW:1000,
        }
    },
    components: {
    },
    mounted() {
        this.svgWidth()
        this.svgBounds = this.$refs.svg.getBoundingClientRect()
        //this.addSankeyPath()
        //this.classesWithOther = getClassesWithOther();
        this.classesWithOther=this.classes;
        let erd = ElementResizeDetectorMaker();
        erd.listenTo(document.getElementById("instanceflow-view"), (ele) => {
            this.svgWidth()
            this.svgBounds = this.$refs.svg.getBoundingClientRect()
            this.addSankeyPath()
        })
    },
    watch: {
        containerElements(newE, oldE) {
            this.svgWidth()
            this.svgBounds = this.$refs.svg.getBoundingClientRect()
            this.addSankeyPath()
        }
    },
    methods: {
        getInstancesFromSankey(sourceClass, targetClass, fromClass, epoch, nextEpoch) {
            return this.instances
                .filter(instance => instance.actual === fromClass)
                .filter(instance => instance.displayInFlow)
                .filter(instance => getIncludedOrOtherIndex(epoch.classifications[instance.index].predicted) === sourceClass)
                .filter(instance => getIncludedOrOtherIndex(nextEpoch.classifications[instance.index].predicted) === targetClass);
        },
        addSankeyPath() {
            if (this.classesWithOther)
                //this.classesWithOther = getClassesWithOther();
                this.classesWithOther=this.classes
            //d3
            let svg = d3.select('#svg')
            svg.selectAll("path").remove();
            this.epochs.slice(0, -1).map((epoch, epochIndex) => {
                const targetOffset = [];
                return this.classesWithOther.map(sourceClass => {
                    if (!this.containerElements.has(sourceClass)) return null;
                    if (!this.containerElements.get(sourceClass).has(epoch.id)) return null;
                    const sourceBounds = this.containerElements.get(sourceClass).get(epoch.id).getBoundingClientRect();
                    let sourceOffset = 0;
                    return this.classesWithOther.map(targetClass => {
                        const nextEpoch = this.epochs[epochIndex + 1];
                        if (!this.containerElements.has(targetClass)) return null;
                        if (!this.containerElements.get(targetClass).has(nextEpoch.id)) return null;
                        const targetBounds = this.containerElements.get(targetClass).get(nextEpoch.id).getBoundingClientRect();

                        if (!targetOffset[targetClass])
                            targetOffset[targetClass] = 0;

                        // Key: From which class, Value: How many?
                        if (!epoch.stats[sourceClass]) return null;
                        const toArr = epoch.stats[sourceClass].to[targetClass];
                        if (!toArr) return null;
                        return this.classes.map(fromClass => {
                            const amount = toArr[fromClass];
                            if (!this.classes.includes(fromClass)) return null;
                            if (!amount) return null;
                            const sourceHeightPercentage = amount / MaxInstancesPerPrediction;
                            const sourceHeight = sourceHeightPercentage * sourceBounds.height;

                            //const targetHeightPercentage = howMany / nextEpoch.stats[targetCIndex].total;
                            const targetHeightPercentage = amount / MaxInstancesPerPrediction;
                            const targetHeight = targetHeightPercentage * targetBounds.height;
                            let text = `${amount} ${getLabel(fromClass)}(s) from ${getLabel(sourceClass)} to ${getLabel(targetClass)}`
                            let clicked = false
                            let startX = -this.svgBounds.x + sourceBounds.right;
                            let startY = -this.svgBounds.y + sourceBounds.top + sourceOffset;
                            let endX = -this.svgBounds.x + targetBounds.left;
                            let endY = -this.svgBounds.y + targetBounds.top + targetOffset[targetClass];
                            let halfDistanceX = Math.abs((endX - startX) / 2)
                            let color = getColor(fromClass)
                            let startHeight = sourceHeight
                            let endHeight = targetHeight

                            svg.append("path")
                                .attr("data-tip", text)
                                .attr("data-effect", "float")
                                .attr("class", "sankey-bar " + (clicked ? "active" : ""))
                                .attr("xmlns", "http://www.w3.org/2000/svg")
                                .attr("d", "M" + startX + " " + startY +
                                    " C" + (startX + halfDistanceX) + " " + startY + ", " + (endX - halfDistanceX) + " " + endY + ", " + endX + " " + endY +
                                    " L" + endX + " " + (endY + endHeight) +
                                    " C" + (endX - halfDistanceX) + " " + (endY + endHeight) + ", " + (startX + halfDistanceX) + " " + (startY + startHeight) + ", " + startX + " " + (startY + startHeight) +
                                    " L" + startX + " " + startY)
                                .attr("fill", color)
                                .attr("storke", "none")
                                .on("mousemove", () => {
                                    d3.select("#path_tooltip").remove();
                                    let pathtooltip = d3.select("body").append("div")
                                        .attr("id", "path_tooltip")
                                        .attr("role", "tooltip")
                                        .attr("aria-hidden", "true")
                                        .attr("class", "el-tooltip__popper is-dark")
                                        .attr("style", "transform-origin: center bottom; z-index: 2003;")
                                        .html(text)
                                        .raise()
                                    pathtooltip.append("div")
                                        .attr("x-arrow", "")
                                        .attr("class", "popper__arrow")
                                        .attr("style", "left: 8px;")
                                    pathtooltip.style("left",event.pageX-pathtooltip.node().getBoundingClientRect().width/2+'px')
                                        .style("top",event.pageY-pathtooltip.node().getBoundingClientRect().height-10+'px')
                                    
                                })
                                .on("mouseout",(event)=>{
                                    d3.select("#path_tooltip").remove();
                                })
                            sourceOffset += sourceHeight;
                            targetOffset[targetClass] += targetHeight;


                        });
                    });
                });
            });
        },
        svgWidth() {
            let elements = d3.selectAll('.instance-class-container').nodes().map(e => e.getBoundingClientRect())
            let width = d3.max(elements.map(e => e.right))-d3.min(elements.map(e => e.left))
            this.svgW=width+150
        },
        showtooltip(text) {
            d3.select("#path_tooltip").remove();
            let pathtooltip = d3.select("body").append("div")
                .attr("id", "path_tooltip")
                .attr("role", "tooltip")
                .attr("aria-hidden", "true")
                .attr("class", "el-tooltip__popper is-dark")
                .attr("style", "transform-origin: center bottom; z-index: 2003;display:none;")
                .html(text)
            pathtooltip.append("div")
                .attr("x-arrow", "")
                .attr("class", "popper__arrow")
                .attr("style", "left: 8px;")
        }
    }
}
</script>

<style>
.sankey-bar {
    opacity: 0.2;
    pointer-events: all;
}

.sankey-bar[data-correct='false'] {
    opacity: 0.3;
    /*
    stroke: red;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-opacity: 0.2;
    stroke-width: 10px;
    stroke-linejoin: round;
    */
}

.sankey-bar[data-which='8'] {
    /*fill: gold;
    opacity: 0.8;*/
}

.sankey-bar[data-correct='true'] {
    opacity: 0.1;
}

.sankey-bar:hover {
    opacity: 0.4;
}

.sankey-bar.active {
    opacity: 0.6;
}
</style>