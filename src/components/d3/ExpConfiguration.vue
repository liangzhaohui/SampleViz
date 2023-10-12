<template>
  <el-row>
    <el-tabs type="border-card" style="height: 247px;width:412px;display:inline-block;gutter:3">
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-s-help"></i> Environment</span>
        <span slot="default" style="color: black; font-size: 12px">Reinforcement learning (RL) is a subfield of machine learning that involves training an agent to make optimal decisions in an environment. The environment can be described as a set of states, actions, and rewards. The agent interacts with the environment by taking actions based on its current state.
        </span>
        <el-dropdown>
        <span class="el-dropdown-link" style="color: black; font-size: 12px">
          Environment Selection<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-cpu"></i> Algorithm</span>
        <span slot="default" style="color: black; font-size: 12px">Reinforcement learning (RL) is a subfield of machine learning that involves training an agent to make optimal decisions in an environment. The environment can be described as a set of states, actions, and rewards. The agent interacts with the environment by taking actions based on its current state.
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="color: black; font-size: 12px"><i class="el-icon-more"></i> Samples status</span>
        <span slot="default" style="color: black; font-size: 12px">Reinforcement learning (RL) is a subfield of machine learning that involves training an agent to make optimal decisions in an environment. The environment can be described as a set of states, actions, and rewards. The agent interacts with the environment by taking actions based on its current state.
        </span>
      </el-tab-pane>

    </el-tabs>

    <el-card :body-style="{ padding: '15px' }" style="height: 208px;width:412px;display:inline-block;gutter:3">
      <el-row>
        <el-dropdown>
        <span class="el-dropdown-link" style="color: black; font-size: 12px">
          Environment Selection<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row>
        <el-card :body-style="{ padding: '5px' }" style="height: 160px;width:180px;display:inline-block;gutter:3">
          <el-image :src="image_url1" style="height: 125px;width:170px"></el-image>
          <div style="padding: 2px;">
            <span style="color: black; font-size: 12px">Montezuma's Revenge</span>
          </div>
        </el-card>
        <div style="height: 160px;width:16px;display:inline-block;gutter:3">
        </div>

        <el-card :body-style="{ padding: '5px' }" style="height: 160px;width:180px;display:inline-block;gutter:3">
          <el-image :src="image_url2" style="height: 125px;width:170px"></el-image>
          <div style="padding: 2px;">
            <span style="color: black; font-size: 12px">Bipedal Walker</span>
          </div>
        </el-card>
      </el-row>

    </el-card>


  </el-row>
</template>

<script>
export default {
  data() {
    return {
      image_url1: './photo/montezuma.jpg',
      image_url2: './photo/bipedalwalker.jpg',
      activeName: 'first',
      value: [20, 80] // 初始值为 [20, 80]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>