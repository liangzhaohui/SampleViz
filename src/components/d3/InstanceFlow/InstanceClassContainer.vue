<template>
    <div class="instance-class-container" ref="container" :style="{ borderColor: _getColor(clazz), order: order }">
        <template v-if="classView == 'overview'">
            <div class="bar-charts-container">
                <div v-for="clz in classes" class="bar-chart-container">
                    <template v-for="(type) in types">
                        <!-- <el-tooltip class="item" effect="dark" :content="`${epoch.stats[clazz][type][clz]} ${_getLabel(clz)}(s) ${type}`" placement="top-start">  -->
                        <div v-if="epoch.stats[clazz][type] && epoch.stats[clazz][type][clz]"
                            :class="`bar-chart tooltip-container ${type}`"
                            :data-tip="`${epoch.stats[clazz][type][clz]} ${_getLabel(clz)}(s) ${type}`"
                            :style="{ '--box-color': _getColor(clz), width: `${epoch.stats[clazz][type][clz] / _MaxInstancesPerPredictionPerClass() * 100}%` }"
                            @mousemove="BarMouseMove(`${epoch.stats[clazz][type][clz]} ${_getLabel(clz)}(s) ${type}`)" @mouseout="BarMouseOut()">
                        </div>
                        <!-- </el-tooltip> -->
                    </template>
                </div>
            </div>
        </template>
        <template v-else-if="classView == 'instances'">
        </template>
    </div>
</template>

<script>
import { get } from 'http';
import { getColor, getLabel, MaxInstancesPerPredictionPerClass } from './InstanceFlowData'
import * as d3 from "d3";

export default {
    name: "InstanceClassContainer",
    data() {
        return {
            types: ["in", "stable", "inout", "out"],

        }
    },
    props: ['instances', 'clazz', 'order', 'epoch', 'classes', 'classView'],
    methods: {
        _getColor(cls) {
            return getColor(cls);
        },
        _getLabel(clazz) {
            return getLabel(clazz);
        },
        _MaxInstancesPerPredictionPerClass() {
            return MaxInstancesPerPredictionPerClass;
        },
        BarMouseMove(text) {
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
            pathtooltip.style("left", event.pageX - pathtooltip.node().getBoundingClientRect().width / 2 + 'px')
                .style("top", event.pageY - pathtooltip.node().getBoundingClientRect().height - 10 + 'px')

        },
        BarMouseOut() {
            d3.select("#path_tooltip").remove();
        }
    },
    mounted() {
        this.$parent.updateContainerElements(this.clazz, this.epoch.id, this.$refs.container);
    },
    updated() {
        this.$parent.updateContainerElements(this.clazz, this.epoch.id, this.$refs.container);
    }
}
</script>

<style>
.instance-class-container {
    border-top: 2px solid;
    border-bottom: 2px solid;
    padding: 3px 0;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    width: stretch;
    z-index: 10;
}

.dense .instance-class-container {
    width: 5px;
}

.instance-class-bar {
    display: grid;
    /*grid-template-rows: repeat(10, 1fr);
    grid-auto-flow: column;*/
}

.instance-class-container .bar-charts-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 75px;
}

.instance-class-container .bar-chart-container {
    flex: 1;

}

.instance-class-bars {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
}

.bar-chart-container {
    display: flex;
}

.bar-chart {
    background-color: var(--box-color);
}

.bar-chart.in {
    filter: brightness(90%);
}

.bar-chart.stable {
    filter: brightness(100%);
}

.bar-chart.inout {
    filter: brightness(90%);
}

.bar-chart.out {
    filter: brightness(80%);
}

.bar-chart:hover {
    filter: brightness(110%);
}
</style>