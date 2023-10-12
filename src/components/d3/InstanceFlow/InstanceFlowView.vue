<template>
    <div id="instanceflow-view" style="width:100%;height: 100%;">
        <!--<template>
          <el-checkbox-group v-model="classes" @change="classesChange()">
            <el-checkbox v-for="(label, i) in data.data.labels" :key="label" :label="i"
                         :style="{ '--fill-color': classColor(i) }">{{ label }}</el-checkbox>
            <el-checkbox :key="data.data.labels.length" :label="data.data.labels.length" :style="{ '--fill-color': classColor(data.data.labels.length) }">other</el-checkbox>
          </el-checkbox-group>
        </template>-->
      <template>
        <div class="legend-container">
          <el-checkbox-group v-model="classes" @change="classesChange()">
            <el-checkbox v-for="(label, i) in data.data.labels" :key="label" :label="i"
                         :style="{ '--fill-color': classColor(i) }">{{ label }}</el-checkbox>
            <el-checkbox :key="data.data.labels.length" :label="data.data.labels.length" :style="{ '--fill-color': classColor(data.data.labels.length) }">other</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>

        <div class="instance-flow-container" :style="{
            gridTemplateColumns: `0px repeat(${epochs.length}, 1fr)`,
            gridTemplateRows: `repeat(${classes.length}, 1fr)`
        }">
            <span v-for="(clazz, i) in     classes" :style="{ order: i }" class="class-label">{{ clazz }}</span>
            <span :style="{ order: (classes.length) }"></span>
            <template v-for="epoch in     epochs">
                <template v-for="(clazz, clazzIndex) in  classes">
                    <template v-if="epoch.stats[clazz]">
                        <InstanceClassContainer :instances="filter_instances(instances, epoch, clazz)" :epoch="epoch"
                            :clazz="clazz" :order="clazzIndex" :classes="classes" :classView="classView">
                        </InstanceClassContainer>
                    </template>
                </template>
                <div class="label" :style="{ order: (classes.length) }">{{ epoch.id }}</div>
            </template>
            <InstanceFlowSVG :instances="instances" :epochs="epochs" :classes="classes" :classView="classView"
                :containerElements="containerElements">
            </InstanceFlowSVG>
        </div>
        <div key="label" className="label"></div>
    </div>
</template>
  
<script>
// 引入基本模板
//import * as echarts from 'echarts';
import { instanceFlowData, getClassesWithOther, getColor, getIncludedOrOtherIndex, setClasses,setRange } from './InstanceFlowData'
import InstanceClassContainer from './InstanceClassContainer.vue'
import InstanceFlowSVG from './SVG/InstanceFlowSVG.vue'
import axios from 'axios'


export default {
    name: "instanceflow-view",
    props: ['range'],
    data() {
        return {
            data: {},
            epochs: [],
            instances: [],
            classesWithOther: [],
            classes: [0, 1, 2, 3],
            classView: "overview",
            containerElements: [],
            file_data: [],
            from:0,
            to:50
        }
    },
    components: {
        "InstanceClassContainer": InstanceClassContainer,
        "InstanceFlowSVG": InstanceFlowSVG
    },
    mounted() {
        setClasses(this.classes)
        this.from = 2 * this.range[0]
        this.to = 2 * this.range[1]
        setRange(this.from,this.to)
        //axios.get('/datasets/cifar10.json')
        axios.get('/datasets/montezuma copy.json')
            .then(response => {
                this.file_data = response.data
                this.data = instanceFlowData(JSON.parse(JSON.stringify(this.file_data)))
                this.epochs = this.data.epochs
                console.log(this.epochs)
                this.instances = this.data.instances
                //this.classesWithOther = getClassesWithOther()
                this.classesWithOther = this.classes
            })
    },
    watch:{
        range:{
            handler(newR,oldR){
                this.from= 2 * newR[0]
                this.to=2 * newR[1]
                this.RangeChange()
            }
        },
        // from(newF,oldF){
        //     this.from=newF
        //     setRange(this.from,this.to)
        // },
        // to(newT,oldT){
        //     this.to=newT
        //     setRange(this.from,this.to)
        // }
    },
    methods: {
        filter_instances(instances, epoch, clazz) {
            return instances.filter((instance, i) => getIncludedOrOtherIndex(epoch.classifications[i].predicted) == clazz)
        },
        updateContainerElements(clazz, epochId, containerElement) {
            let containerElements = this.containerElements
            const res = new Map(containerElements);
            const curr = res.get(clazz) || new Map();
            if (!containerElement) {
                curr.delete(epochId);
            } else {
                curr.set(epochId, containerElement);
            }
            res.set(clazz, curr);
            this.containerElements = res;
        },
        classColor(i) {
            return getColor(i);
        },
        classesChange() {
            this.classes = Array.from(this.classes).sort((a, b) => (Number(a) - Number(b)))
            setClasses(this.classes)
            this.data = this.data = instanceFlowData(JSON.parse(JSON.stringify(this.file_data)))
            this.epochs = this.data.epochs
            console.log(this.epochs)
            this.instances = this.data.instances
            //this.classesWithOther = getClassesWithOther()
            this.classesWithOther = this.classes
        },
        RangeChange(){
            setRange(this.from,this.to)
            this.data = this.data = instanceFlowData(JSON.parse(JSON.stringify(this.file_data)))
            this.epochs = this.data.epochs
            this.instances = this.data.instances
            this.classesWithOther = this.classes
        }
    }
}
</script>
<style scoped>

.legend-container {
  position: absolute;
  top: 5px;
  right: 5px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 4px;
  justify-items: flex-end;
}

.container {
    width: 100%;
    height: 100%;
}

.instance-flow-container {
    width: 81%;
    height: 95%;
    top: 5%;
    right: 17%;
    display: grid;
    position: absolute;
    margin: auto auto 0 auto;
    /*grid-column-gap: 100px;*/
    grid-column-gap: 75px;
    grid-row-gap: 5%;
    padding: 0 -100px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.instance-flow-container .class-label {
    /*width: 90px;*/
    width: 65px;
    align-self: center;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
}

.instance-flow-container.dense .class-label {
    width: 50px;
}

.instance-flow-container.dense {
    grid-column-gap: 50px;
}

.overflow-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
}

#svg {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.label {
    margin-bottom: 5px;
    text-align: center;
}


.dense .instance-class-container {
    width: 5px;
}

.instance-class-bar {
    display: grid;
    /*grid-template-rows: repeat(10, 1fr);
    grid-auto-flow: column;*/
}

</style>
<style lang='scss' scoped>
.legend-container ::v-deep .el-checkbox {
       .el-checkbox__input.is-checked .el-checkbox__inner,
       .el-checkbox__input.is-indeterminate .el-checkbox__inner {
         background-color: var(--fill-color);
         border-color: var(--fill-color);
       }

       .el-checkbox__input.is-focus .el-checkbox__inner,
       .el-checkbox__inner,
       .el-checkbox__inner:hover {
         border-color: var(--fill-color);
       }
       .el-checkbox__input.is-checked+.el-checkbox__label{
        color:black;
    }

}
.legend-container ::v-deep .el-checkbox-group {
  position: absolute;
  top: 0px;
  right: 0px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 0px;
  align-items: flex-end;
  width: auto; /* 添加这一行 */
}

.legend-container ::v-deep .el-checkbox {
  display: flex;
  align-items: flex-end;
  padding: 11px 0px;
  padding-left: 0; /* 将 padding-left 修改为 0 */
  padding-right: 0;
}
</style>

