<template>
  <div>
    <div
      ref="myPage"
      class="c-my-graph-theme"
      style="height: calc(100vh)"
      @mousemove="onMouseMove"
    >
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-canvas-click="onCanvasClick"
        :on-contextmenu="onContextmenu"
      >
        <template #node="{ node }">
          <div>
            <div class="c-my-node-icon">
              <i style="font-size: 30px" :class="node.data.myicon" />
            </div>
            <div class="c-my-node-name">
              {{ node.data.myicon }}
            </div>
          </div>
        </template>
        <template #graph-plug>
          <div
            v-if="isShowNodeMenuPanel || isShowLineMenuPanel"
            class="c-operation-mask-bg"
            @click="hideAllPanel"
          />
          <div
            v-if="isShowNodeMenuPanel"
            class="c-context-menu-panel"
            :style="{
              left: nodeMenuPanelPosition.x + 'px',
              top: nodeMenuPanelPosition.y + 'px',
            }"
          >
            <div
              style="
                line-height: 25px;
                padding-left: 10px;
                color: #888888;
                font-size: 12px;
              "
            >
              {{ currentNode.data.length }}
              Node[{{ currentNode.text }}]Actions：
            </div>
            <div v-for="(item, index) in currentNode.data.ids" :key="index">
              <div class="c-node-menu-item" @click.stop="doActionForNode(item)">
                {{ item }}
              </div>
            </div>
          </div>
          <div
            v-if="isShowNodeTips"
            class="c-tips"
            :style="{
              left: nodeTipsPosition.x + 'px',
              top: nodeTipsPosition.y + 'px',
            }"
          >
            <div>NodeId: {{ currentNode.text }}</div>
            <div>Icon: {{ currentNode.data.myicon }}</div>
          </div>
          <div
            v-if="isShowLineMenuPanel"
            class="c-context-menu-panel"
            :style="{
              left: lineMenuPosition.x + 'px',
              top: lineMenuPosition.y + 'px',
            }"
          >
            <div
              style="
                line-height: 25px;
                padding-left: 10px;
                color: #888888;
                font-size: 12px;
              "
            >
              Line[{{ currentLine.text }}]Actions：
            </div>
            <div
              class="c-node-menu-item"
              @click.stop="doActionForLine('Line Action 1')"
            >
              Action 1
            </div>
            <div
              class="c-node-menu-item"
              @click.stop="doActionForLine('Line Action 2')"
            >
              Action 2
            </div>
            <div
              class="c-node-menu-item"
              @click.stop="doActionForLine('Line Action 3')"
            >
              Action 3
            </div>
            <div
              class="c-node-menu-item"
              @click.stop="doActionForLine('Line Action 4')"
            >
              Action 4
            </div>
          </div>
          <div
            v-if="isShowLineTips"
            class="c-tips"
            :style="{
              left: lineTipsPosition.x + 'px',
              top: lineTipsPosition.y + 'px',
            }"
          >
            <div>Text: {{ currentLine.text }}</div>
            <div>From Node: {{ currentLink.fromNode.text }}</div>
            <div>To Node: {{ currentLink.toNode.text }}</div>
          </div>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 25px">
              <div>这个示例主要展示：</div>
              <div>鼠标移动到【节点】和【连线】上均有悬浮框</div>
              <div>支持对【节点】和【连线】使用右键展示菜单</div>
              <div>这些操作相关的面板在全屏后依然可以使用</div>
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { RelationGraph },
  data() {
    return {
      // ---------------------------------node------------------------------
      currentNode: null,
      // --------Node Tips-----------
      isShowNodeTips: false,
      nodeTipsPosition: { x: 0, y: 0 },
      // --------Node Context Menu-----------
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      // --------------------------------Line------------------------------
      currentLink: null,
      currentLine: null,
      // --------Line tips-----------
      isShowLineTips: false,
      lineTipsPosition: { x: 0, y: 0 },
      // --------Line Context Menu-----------
      isShowLineMenuPanel: false,
      lineMenuPosition: { x: 0, y: 0 },
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineColor: 'auto',
        defaultNodeColor: 'auto',
        defaultNodeBorderWidth: 'auto',
        defaultNodeBorderColor: 'auto',
        defaultNodeFontColor: 'auto'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  mounted() {
    this.showGraph()
    // 监控全屏事件，记得在组件销毁时移除这个事件
    this.fullscreenchange = () => {
      this.resizeViewWhenFullscreen()
    }
    document.addEventListener('fullscreenchange', this.fullscreenchange)
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.fullscreenchange)
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          // { id: '1', text: 'Node-1', data: { myicon: 'el-icon-star-on' }},
          {
            id: '2',
            text: 'Node-2',
            data: { length: 4, myicon: 'el-icon-setting', ids: [3, 7, 8] }
          }
          // { id: '3', text: 'Node-3', data: { myicon: 'el-icon-setting' }},
          // { id: '7', text: 'Node-7', data: { myicon: 'el-icon-setting' }},
          // { id: '8', text: 'Node-8', data: { myicon: 'el-icon-star-on' }},
          // { id: '9', text: 'Node-9', data: { myicn: 'el-icon-headset' }},
          // { id: '71', text: 'Node-71', data: { myicon: 'el-icon-headset' }},
          // { id: '72', text: 'Node-72', data: { myicon: 'el-icon-s-tools' }},
          // { id: '73', text: 'Node-73', data: { myicon: 'el-icon-star-on' }},
          // {
          //   id: '81',
          //   text: 'Node-81',
          //   data: { myicon: 'el-icon-s-promotion' }
          // },
          // {
          //   id: '82',
          //   text: 'Node-82',
          //   data: { myicon: 'el-icon-s-promotion' }
          // },
          // { id: '83', text: 'Node-83', data: { myicon: 'el-icon-star-on' }},
          // {
          //   id: '84',
          //   text: 'Node-84',
          //   data: { myicon: 'el-icon-s-promotion' }
          // },
          // { id: '85', text: 'Node-85', data: { myicon: 'el-icon-sunny' }}
        ],
        lines: [
          // { from: '2', to: '1', text: 'Line Text16' },
          // { from: '3', to: '1', text: 'Line Text17' },
          // { from: '2', to: '7', text: 'Line Text20' },
          // { from: '2', to: '8', text: 'Line Text21' },
          // { from: '2', to: '9', text: 'Line Text22' },
          // { from: '1', to: '5', text: 'Line Text23' },
          // { from: '7', to: '71', text: 'Line text1' },
          // { from: '7', to: '73', text: 'Line text3' },
          // { from: '8', to: '81', text: 'Line text4' },
          // { from: '8', to: '82', text: 'Line text5' },
          // { from: '8', to: '84', text: 'Line text7' },
          // { from: '9', to: '91', text: 'Line text9' }
        ]
      }
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
      // this.showNodeContextMenu($event, nodeObject);
      this.hideAllPanel()
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject)
      this.hideAllPanel()
    },
    hideAllPanel() {
      this.isShowLineMenuPanel = false
      this.isShowNodeMenuPanel = false
      this.isShowNodeTips = false
      this.isShowLineTips = false
    },
    onContextmenu($event, objectType, object) {
      console.log(
        'onContextmenu:',
        objectType,
        object,
        $event.clientX,
        $event.clientY
      )
      this.hideAllPanel()
      if (objectType === 'node') {
        this.showNodeContextMenu($event, object)
      }
      if (objectType === 'link') {
        this.showLinkContextMenu($event, object)
      }
    },
    showNodeContextMenu($event, nodeObject) {
      console.log('nodeObject', nodeObject)

      this.currentNode = nodeObject
      const graphInstance = this.$refs.graphRef.getInstance()
      graphInstance.setCheckedNode(this.currentNode.id) // 为了让清晰显示对哪个节点展示了右键菜单
      const _base_position = graphInstance.options.fullscreen
        ? { x: 0, y: 0 }
        : graphInstance.getBoundingClientRect()
      console.log('showNodeContextMenu:', nodeObject.id, nodeObject.text)
      this.isShowNodeMenuPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10
      // 根据你的需求，可以选择隐藏菜单的方式，本示例中使用onCanvasClick事件来隐藏菜单，你也可以使用以下常规方式：
      // const hideContentMenu = () => {
      //   this.isShowNodeTipsPanel = false;
      //   document.body.removeEventListener('click', hideContentMenu)
      // }
      // document.body.addEventListener('click', hideContentMenu)
    },
    showLinkContextMenu($event, linkObject) {
      console.log(
        'showLinkContextMenu:',
        linkObject.fromNode.text,
        ' > ',
        linkObject.toNode.text
      )
      const lineIndex = getLineElementIndex($event.target)
      this.currentLink = linkObject
      this.currentLine = linkObject.relations[lineIndex]
      const graphInstance = this.$refs.graphRef.getInstance()
      graphInstance.setCheckedLinkAndLine(linkObject, this.currentLine)
      const _base_position = graphInstance.options.fullscreen
        ? { x: 0, y: 0 }
        : graphInstance.getBoundingClientRect()
      this.isShowLineMenuPanel = true
      this.lineMenuPosition.x = $event.clientX - _base_position.x + 10
      this.lineMenuPosition.y = $event.clientY - _base_position.y + 10
    },
    onCanvasClick($event) {
      console.log('onCanvasClick:', $event)
      this.hideAllPanel()
      const graphInstance = this.$refs.graphRef.getInstance()
      graphInstance.clearChecked()
    },
    onMouseMove($event) {
      const graphInstance = this.$refs.graphRef.getInstance()
      const node = graphInstance.isNode($event.target)
      // console.log('onMouseMove:', $event.x, $event.y, node)
      if (node) {
        this.showNodeTips($event, node)
        this.isShowNodeTips = true
      } else {
        this.isShowNodeTips = false
        const link = graphInstance.isLink($event.target)
        if (link) {
          this.showLineTips($event, link)
          this.isShowLineTips = true
        } else {
          this.isShowLineTips = false
        }
      }
    },
    showNodeTips($event, nodeObject) {
      const graphInstance = this.$refs.graphRef.getInstance()
      const _base_position = graphInstance.options.fullscreen
        ? { x: 0, y: 0 }
        : graphInstance.getBoundingClientRect()
      // console.log(
      //   'showNodeTips:',
      //   $event.clientX,
      //   $event.clientY,
      //   nodeObject,
      //   _base_position.x,
      //   _base_position.y
      // )
      this.currentNode = nodeObject
      this.nodeTipsPosition.x = $event.clientX - _base_position.x + 10
      this.nodeTipsPosition.y = $event.clientY - _base_position.y + 10
    },
    showLineTips($event, linkObject) {
      const graphInstance = this.$refs.graphRef.getInstance()
      const _base_position = graphInstance.options.fullscreen
        ? { x: 0, y: 0 }
        : graphInstance.getBoundingClientRect()
      // console.log(
      //   'showLineTips:',
      //   $event.clientX,
      //   $event.clientY,
      //   this.currentLine,
      //   _base_position.x,
      //   _base_position.y
      // )
      this.lineTipsPosition.x = $event.clientX - _base_position.x + 10
      this.lineTipsPosition.y = $event.clientY - _base_position.y + 10
      const lineIndex = getLineElementIndex($event.target)
      this.currentLink = linkObject
      this.currentLine = linkObject.relations[lineIndex]
    },
    nodeSlotOut(nodeObject) {
      console.log('nodeSlotOut:', nodeObject)
    },
    async loadNextLevel1_2Data() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // { id: '1', text: 'Node-1', data: { myicon: 'el-icon-star-on' }},
          // { id: '4', text: '节点-4', myicon: 'el-icon-star-on' }
          { id: '6', text: '节点-6', myicon: 'el-icon-setting' }
        ],
        lines: [{ from: '2', to: '6', text: 'Line Text16' }]
      }
      const graphInstance = this.$refs.graphRef.getInstance()
      // 新增节点数据
      graphInstance.addNodes(__graph_json_data.nodes)
      // 新增线条数据
      graphInstance.addLines(__graph_json_data.lines)
      // 如果是force布局
      __graph_json_data.nodes.forEach((node) => {
        node.x = Math.floor(Math.random() * 300)
        node.y = Math.floor(Math.random() * 300)
      })
      await graphInstance.layouter.placeNodes(
        graphInstance.graphData.nodes,
        graphInstance.graphData.rootNode
      )
    },
    async loadNextLevel1_1Data() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // { id: '1', text: 'Node-1', data: { myicon: 'el-icon-star-on' }},
          { id: '4', text: '节点-4', myicon: 'el-icon-star-on' }
          // { id: '6', text: '节点-6', myicon: 'el-icon-setting' }
        ],
        lines: [
          { from: '4', to: '2', text: 'Line Text16' },
          { from: '2', to: '4', text: 'Line Text16' }
        ]
      }
      const graphInstance = this.$refs.graphRef.getInstance()
      // 新增节点数据
      graphInstance.addNodes(__graph_json_data.nodes)
      // 新增线条数据
      graphInstance.addLines(__graph_json_data.lines)
      // 如果是force布局
      __graph_json_data.nodes.forEach((node) => {
        node.x = Math.floor(Math.random() * 300)
        node.y = Math.floor(Math.random() * 300)
      })
      await graphInstance.layouter.placeNodes(
        graphInstance.graphData.nodes,
        graphInstance.graphData.rootNode
      )
    },
    async loadNextLevel1Data() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          {
            id: '1',
            text: 'Node-1',
            data: { myicon: 'el-icon-star-on', ids: [5] }
          }
          // { id: '4', text: '节点-4', myicon: 'el-icon-star-on' },
          // { id: '6', text: '节点-6', myicon: 'el-icon-setting' }
        ],
        lines: [{ from: '2', to: '1', text: 'Line Text16' }]
      }
      const graphInstance = this.$refs.graphRef.getInstance()
      // 新增节点数据
      graphInstance.addNodes(__graph_json_data.nodes)
      // 新增线条数据
      graphInstance.addLines(__graph_json_data.lines)
      // 如果是force布局
      __graph_json_data.nodes.forEach((node) => {
        node.x = Math.floor(Math.random() * 300)
        node.y = Math.floor(Math.random() * 300)
      })
      await graphInstance.layouter.placeNodes(
        graphInstance.graphData.nodes,
        graphInstance.graphData.rootNode
      )
    },
    async loadNextLevel2Data() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // { id: '1', text: 'Node-1', data: { myicon: 'el-icon-star-on', ids: [5] }}
          // { id: '4', text: '节点-4', myicon: 'el-icon-star-on' },
          { id: '5', text: '节点-6', myicon: 'el-icon-setting' }
        ],
        lines: [{ from: '5', to: '1', text: 'Line Text16' },
          { from: '5', to: '6', text: 'Line Text16' }
        ]
      }
      const graphInstance = this.$refs.graphRef.getInstance()
      // 新增节点数据
      graphInstance.addNodes(__graph_json_data.nodes)
      // 新增线条数据
      graphInstance.addLines(__graph_json_data.lines)
      // 如果是force布局
      __graph_json_data.nodes.forEach((node) => {
        node.x = Math.floor(Math.random() * 300)
        node.y = Math.floor(Math.random() * 300)
      })
      await graphInstance.layouter.placeNodes(
        graphInstance.graphData.nodes,
        graphInstance.graphData.rootNode
      )
    },
    doActionForNode(id) {
      console.log('currentNode.data', id)
      if (id === 3) {
        this.loadNextLevel1Data()
      }
      if (id === 7) {
        this.loadNextLevel1_1Data()
      }
      if (id === 8) {
        this.loadNextLevel1_2Data()
      }
      if (id === 5) {
        this.loadNextLevel2Data()
      }
      // this.$notify({
      //   title: 'Notice',
      //   message: `Operation:[${actionName}] To Node[${this.currentNode.text}]`,
      //   type: 'success'
      // })
      this.hideAllPanel()
    },
    doActionForLine(actionName) {
      this.$notify({
        title: 'Notice',
        message: `Operation:[${actionName}] To Line[${this.currentLine.text}]`,
        type: 'success'
      })
      this.hideAllPanel()
    },
    resizeViewWhenFullscreen() {
      if (document.fullscreenElement) {
        // div进入全屏模式
        console.log('div进入全屏模式', document.fullscreenElement)
        console.log('graphRef', this.$refs.graphRef.$el)
        const graphInstance = this.$refs.graphRef.getInstance()
        // vue 会将组件对应的Element挂载在组件对象的$el属性中
        if (this.$refs.graphRef.$el === document.fullscreenElement) {
          console.log('relation-graph被全屏了!')
          setTimeout(async() => {
            await graphInstance.resetViewSize()
            await graphInstance.moveToCenter()
            await graphInstance.zoomToFit()
            console.log('relation-graph 重置完成!')
          }, 500)
        }
      } else {
        // div退出全屏模式
        console.log('div退出全屏模式')
        setTimeout(async() => {
          const graphInstance = this.$refs.graphRef.getInstance()
          await graphInstance.resetViewSize()
          await graphInstance.moveToCenter()
          await graphInstance.zoomToFit()
          console.log('relation-graph 重置完成!')
        }, 500)
      }
    }
  }
}
const getLineElementIndex = (el, deep = 0) => {
  if (deep > 10) return -1 // 层级太深了，不继续找了
  if (el.tagName === 'body') return -1 // 到头了
  if (el.parentElement.classList.contains('rel-link-peel')) {
    return Array.from(el.parentElement.children).indexOf(el)
  } else {
    return getLineElementIndex(el.parentElement, deep + 1)
  }
}
</script>

<style lang="scss" scoped>
// 这个style标签中的样式设置关系图的样式，与节点菜单、悬浮框无关
::v-deep .c-my-graph-theme {
  .rel-map {
    background-color: #ffffff;
  }
  .rel-node {
    background-color: rgba(241, 5, 221, 0.73);
    border: 2px solid rgba(241, 5, 221, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text {
    fill: rgba(241, 5, 221);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease,
      -webkit-box-shadow 0.2s ease;
    box-shadow: 0 0 0 8px rgba(241, 5, 221, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(241, 5, 221, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(241, 5, 221, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221, 0.2);
  }
  .rel-graph-loading {
    background-color: #ecf4f8;
  }
}
.c-my-panel {
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

<style lang="scss" scoped>
// 这里的样式是本示例的关键样式
.c-my-node-icon {
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  place-items: center;
  justify-content: center;
  color: #ffffff;
}
.c-my-node-name {
  color: rgba(241, 5, 221, 1);
  font-size: 16px;
  position: absolute;
  width: 160px;
  height: 25px;
  line-height: 25px;
  margin-top: 5px;
  margin-left: -50%;
  text-align: center;
  background-color: rgba(241, 5, 221, 0.2);
  border-radius: 10px;
}
.c-node-menu-item {
  border-radius: 6px;
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}
.c-node-menu-item:hover {
  background-color: rgba(241, 5, 221, 0.2);
}

.c-operation-mask-bg {
  position: absolute;
  background-color: rgba(51, 51, 51, 0.1);
  opacity: 0.1;
  z-index: 700;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
}
.c-context-menu-panel {
  z-index: 999;
  padding: 10px;
  background-color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  position: absolute;
  border-radius: 10px;
}
.c-tips {
  z-index: 999;
  padding: 10px;
  width: 200px;
  position: absolute;
  border-radius: 10px;
  background-color: #333333;
  color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  & > div {
    line-height: 25px;
    padding-left: 10px;
    font-size: 12px;
  }
}
</style>
