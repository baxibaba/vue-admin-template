<template>
  <div>
    <el-button @click="showAll">全部{{ isShowAll?'收起':'展示' }}</el-button>
    <el-button @click="showBase">展示base</el-button>
    <el-button @click="showDynamic">展示dynamic</el-button>
    <div style="width: calc(100% - 2px);height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="userGraphOptions" :on-node-expand="onNodeExpand" :on-node-collapse="onNodeCollapse" :on-node-click="onNodeClick" />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph'
export default {
  name: 'RelationGraphDemo',
  components: {
    RelationGraph
  },
  data() {
    return {
      g_loading: true,
      isShowAll: false,
      showType: '',
      graphData: {},
      userGraphOptions: {
        // backgrounImage: '',
        // backgrounImageNoRepeat: true,
        layout:
          {
            label: '手工',
            layoutName: 'fixed'
            // layoutClassName: 'seeks-layout-fixed',
            // defaultJunctionPoint: 'border',
            // defaultNodeShape: 0,
            // defaultLineShape: 1
          },
        defaultNodeBorderWidth: 0,
        defaultNodeShape: 1,
        // 'allowShowMiniToolBar': false,
        defaultLineTextOffset_y: -2,
        defaultJunctionPoint: 'lr',
        defaultLineShape: 1
      }
    }
  },
  created() {
  },
  mounted() {
    this.setGraphData()
  },
  methods: {
    showAll() {
      this.isShowAll = !this.isShowAll
      this.setGraphData(this.isShowAll) // 传递true来展开所有节点
    },
    showBase() {
      this.showType = 'base'
      this.setGraphData(this.isShowAll, this.showBaseType)
    },
    showDynamic() {
      this.showType = 'dynamic'
      this.setGraphData(this.isShowAll, this.showBaseType) // 根据showBaseType更新图谱数据
    },
    onNodeCollapse(node, e) {
      console.log('onNodeCollapse:', node)
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      this.$refs.graphRef.getInstance().doLayout()
    },
    onNodeClick(nodeObject, $event) {
      console.log('nodeObject:', nodeObject, this.graphData)
      const item = this.graphData.nodes.find(node => node.id === nodeObject.id)
      this.$message({
        message: item.text,
        type: 'warning'
      })
    },
    onNodeExpand(node, e) {
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node)
      this.$refs.graphRef.getInstance().doLayout()
    },
    setGraphData(expandAll = false, showOnlyBase = false) {
      const _orign_data = {
        entname: '张三疯子',
        invs: [
          { id: 'inv1', text: '张三疯子', desc: '40%', type: 'dynamic' },
          { id: 'inv2', text: '张蜈支', desc: '30%', type: 'dynamic' },
          { id: 'inv3', text: '如花', desc: '10%', type: 'dynamic' },
          { id: 'inv4', text: '路人甲', desc: '10%', type: 'dynamic' },
          { id: 'inv5', text: '路人乙', desc: '10%', type: 'dynamic' }
        ],
        persons: [
          { id: 'person1', text: '张蜈支', desc: '董事长', type: 'dynamic' },
          { id: 'person2', text: '包奥曼', desc: '总经理', type: 'dynamic' },
          { id: 'person3', text: '路人甲', desc: '监事', type: 'dynamic' },
          { id: 'person4', text: '路人乙', desc: '董事', type: 'dynamic' }
        ],
        asInvs: [
          { id: 'asinv1', text: '路人乙', desc: '80%', type: 'base' },
          { id: 'asinv3', text: '路人乙', desc: '20%', type: 'base' }
        ],
        branchs: [
          { id: 'branch1', text: '路人乙', desc: '80%', type: 'base' },
          { id: 'branch5', text: '路人乙', desc: '20%', type: 'base' }
        ]
      }

      // 手工设置节点的坐标
      const _center = {
        x: 0,
        y: 0
      }
      const graphData = {
        rootId: 'root',
        nodes: [],
        lines: []
      }
      // 添加根节点和虚拟节点
      const rootNode = { id: graphData.rootId, text: _orign_data.entname, expandHolderPosition: 'right', styleClass: 'c-g-center', color: 'red', width: 50, height: 50 }
      const invRootNode = { id: 'invRoot', text: '有犯罪记录', expandHolderPosition: 'left', color: 'blue', width: 50, height: 50, type: 'dynamic' }
      const personRootNode = { id: 'personRoot', text: '抢劫', expandHolderPosition: 'left', color: 'blue', width: 50, height: 50, type: 'dynamic' }
      const asinvRootNode = { id: 'asinvRoot', text: '有房产', expandHolderPosition: 'right', color: 'gray', width: 50, height: 50, type: 'base' }
      const branchRootNode = { id: 'branchRoot', text: '未婚', expandHolderPosition: 'right', color: 'gray', width: 50, height: 50, type: 'base' }
      invRootNode.x = _center.x - 200 - invRootNode.width
      invRootNode.y = _center.y - 130
      personRootNode.x = _center.x - 200 - personRootNode.width
      personRootNode.y = _center.y + 130
      asinvRootNode.x = _center.x + 200
      asinvRootNode.y = _center.y - 130
      branchRootNode.x = _center.x + 200
      branchRootNode.y = _center.y + 90
      // 添加节点数据到graphData
      graphData.nodes.push(rootNode)
      graphData.nodes.push(invRootNode)
      graphData.nodes.push(personRootNode)
      graphData.nodes.push(asinvRootNode)
      graphData.nodes.push(branchRootNode)
      graphData.nodes.forEach(thisLevel1Node => {
        thisLevel1Node.expanded = false
      })
      this.$refs.graphRef.refresh()
      // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
      graphData.lines.push({ from: rootNode.id, to: invRootNode.id, color: '#C7E9FF', type: 'dynamic' })
      graphData.lines.push({ from: rootNode.id, to: personRootNode.id, color: '#C7E9FF', type: 'dynamic' })
      graphData.lines.push({ from: rootNode.id, to: asinvRootNode.id, color: '#C7E9FF', type: 'base' })
      graphData.lines.push({ from: rootNode.id, to: branchRootNode.id, color: '#C7E9FF', type: 'base' })

      // 添加从"有房产"到"张三疯子"的双向关系线
      graphData.lines.push({ from: asinvRootNode.id, to: rootNode.id, color: '#FFC5A6', type: 'custom-bidirectional', arrow: 'both' }) // 自定义颜色、类型和箭头

      // 将股东加入虚拟节点"股东"
      _orign_data.invs.forEach((thisNode, _index) => {
        thisNode.width = 60
        thisNode.height = 60
        thisNode.x = invRootNode.x - 300 - thisNode.width
        thisNode.y = invRootNode.y + _index * 100 * -1 + 30
        graphData.nodes.push(thisNode)
        graphData.lines.push({ from: invRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFC5A6', arrow: 'none', type: 'dynamic' })
      })
      // 将高管加入虚拟节点"高管"
      _orign_data.persons.forEach((thisNode, _index) => {
        thisNode.width = 60
        thisNode.height = 60
        thisNode.x = personRootNode.x - 200 - thisNode.width
        thisNode.y = personRootNode.y + _index * 100
        graphData.nodes.push(thisNode)
        graphData.lines.push({ from: personRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#B9FFA7', arrow: 'none', type: 'dynamic' })
      })
      // 将对外投资企业加入虚拟节点"对外投资"
      _orign_data.asInvs.forEach((thisNode, _index) => {
        thisNode.x = asinvRootNode.x + 300
        thisNode.y = asinvRootNode.y + _index * 100 * -1 + 100
        thisNode.styleClass = 'my-node-class'
        graphData.nodes.push(thisNode)
        graphData.lines.push({ from: asinvRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFBEC1', type: 'base' })
      })
      // 将分支机构加入虚拟节点"分支机构东"
      _orign_data.branchs.forEach((thisNode, _index) => {
        thisNode.x = branchRootNode.x + 200
        thisNode.y = branchRootNode.y + _index * 100
        thisNode.styleClass = 'my-node-class'
        graphData.nodes.push(thisNode)
        graphData.lines.push({ from: branchRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFA1F8', type: 'base' })
      })
      if (this.showType === 'base') {
        graphData.nodes = graphData.nodes.filter(item => {
          console.log('item==', item)
          return item.type !== 'dynamic'
        })
        graphData.lines = graphData.lines.filter(item => {
          return item.type !== 'dynamic'
        })
      }
      if (this.showType === 'dynamic') {
        graphData.nodes = graphData.nodes.filter(item => {
          console.log('item==', item)
          return item.type !== 'base'
        })
        graphData.lines = graphData.lines.filter(item => {
          return item.type !== 'base'
        })
      }
      console.log('graphData==', graphData)
      this.graphData = graphData
      graphData.nodes.forEach(node => {
        this.showType = ''
        if (expandAll) {
          // 假设图谱组件通过节点的某个属性来控制展开/折叠状态
          // 这里我们假设是 `expanded` 属性，但具体取决于图谱组件的实现
          node.expanded = true // 设置所有节点为展开状态
        } else {
          node.expanded = false // 默认设置为折叠状态
        }
      })

      this.$refs.graphRef.setJsonData(graphData, (graphInstance) => {
      })
    }

  }
}
</script>
<style scoped>
::v-deep .my-node-class {
  width: 60px;
  height: 60px;
}
</style>
