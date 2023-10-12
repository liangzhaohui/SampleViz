<template>
  <el-card :body-style="{ padding: '15px' }" style="height: 427px;width:414px;display:inline-block;gutter:3">
    <el-row >
      <el-col >
        <el-card :body-style="{ padding: '10px' }" style="height: 395px;width:380px;display:inline-block;gutter:3">
          <div class="block" style="display:inline-block;width:40px;gutter:3">
          </div>
          <div class="block" style="display:inline-block;gutter:3">
            <el-image :src="image_url" style="height: 260px;width:270px"></el-image>
            <!--<div :style="boxStyle" class="rectangle-box"></div>-->
            <div
                v-for="(box, index) in boxes"
                :key="index"
                :style="boxStyle(box)"
                class="rectangle-box"
                @click="selectedBoxIndex = index"
            ></div>
          </div>
          <div class="block" style="display:inline-block;width:30px;gutter:3">
          </div>
          <div class="block" style="display:inline-block;gutter:3">
            <div style="height: 46px;width:45px;display:inline-block;gutter:3">
            </div>
            <div style="height: 46px;width:40px;display:inline-block;gutter:3">
              <span class="demonstration" style="color: black; font-size: 12px"></span>
              <!--<el-button icon="el-icon-s-tools" circle @click="changeBoxColor"></el-button>-->
              <el-popover
                  ref="colorPickerPopover"
                  placement="top"
                  trigger="click"
                  :popper-class="'popover-content'"
              >
                <div class="popover-center">
                  <h2 class="popover-header">ColorSetting</h2>
                  <el-color-picker
                      v-model="selectedColor"
                      @change="updateColor"
                      size="mini"
                  ></el-color-picker>
                </div>
                <el-button
                    icon="el-icon-s-tools"
                    circle
                    slot="reference"
                ></el-button>
              </el-popover>

            </div>
            <div style="height: 46px;width:70px;display:inline-block;gutter:3">
            </div>
            <div style="height: 46px;width:40px;display:inline-block;gutter:3">
              <span class="demonstration" style="color: black; font-size: 12px"></span>
              <el-button icon="el-icon-edit" circle @click="createBox(cood)"></el-button>
            </div>
            <div style="height: 46px;width:70px;display:inline-block;gutter:3">
            </div>
            <div style="height: 46px;width:40px;display:inline-block;gutter:3">
              <span class="demonstration" style="color: black; font-size: 12px"></span>
              <el-button icon="el-icon-delete-solid" circle @click="deleteBox"></el-button>
            </div>

          </div>
          <div style="padding: 14px;">
            <span></span>
            <div class="block">
              <el-slider
                  v-model="value"
                  @change="handleChange"
                  range
                  show-stops
                  :min="0"
                  :max="25"
              >
              </el-slider>
            </div>
          </div>
        </el-card>

      </el-col>

    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    cood: {
      type: Array
    }
  },
  computed: {
    //boxStyle(box) {
    //  return {
    //    position: 'absolute',
    //    border: '2px solid ' + box.color,
    //    top: (box.cood[2] / 3.9 + 116) + 'px',
    //    left: (box.cood[0] / 2.7 + 47) + 'px',
    //    width: ((box.cood[1] - box.cood[0]) / 2.7) + 'px',
    //    height: ((box.cood[3] - box.cood[2]) / 3.9) + 'px'
    //  }
    //}
  },
  data() {
    return {
      image_url: './photo/montezuma.svg',
      color: '#409EFF',
      boxes: [], // 用于存储多个方框的数组
      selectedBoxIndex: -1, // 当前选中的方框索引
      selectedColor: '#da8c17',
    }
  },
  watch: {
    cood: {
      immediate: true,
      deep: true,
      handler(newCood) {
        console.log('Cood in grid-view:', newCood);
        // Emit update:cood event for .sync modifier
        this.$emit('update:cood', newCood);
      }
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.value)
      console.log(this.value)
    },
    //changeBoxColor() {
    //  if (this.selectedBoxIndex !== -1) {
    //    // 改变选中方框的颜色
    //    this.$set(this.boxes[this.selectedBoxIndex], 'color', '新的颜色');
    //  }// 在此实现修改方框颜色的逻辑
    //},
    boxStyle(box) {
      return {
        position: 'absolute',
        border: '2px solid ' + box.color,
        top: (box.cood[2] / 3.9 + 116) + 'px',
        left: (box.cood[0] / 2.7 + 47) + 'px',
        width: ((box.cood[1] - box.cood[0]) / 2.7) + 'px',
        height: ((box.cood[3] - box.cood[2]) / 3.9) + 'px',
      };
    },
    createBox(newCood) {
      this.boxes.push({
        cood: Array.from(newCood), // 使用传递的坐标
        color: this.selectedColor // 使用预先设置的颜色
      });
      this.selectedBoxIndex = this.boxes.length - 1;
    },
    deleteBox() {
      if (this.selectedBoxIndex !== -1) {
        this.boxes.splice(this.selectedBoxIndex, 1);
        this.selectedBoxIndex = -1;
      }// 在此实现删除方框的逻辑
    },
    updateColor(color) {
      if (this.selectedBoxIndex !== -1) {
        this.$set(this.boxes[this.selectedBoxIndex], 'color', color.value);
      }
    },
  }
}
</script>
<style>

.popover-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.popover-header {
  text-align: center;
  width: 100%;
  font-size: 14px;
  margin-bottom: 5px;
}

.popover-content {
  max-width: 160px;
  min-width: 160px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
 
