<template>
<div style="margin:10px">
    <div style="margin:10px;text-align:right">
        <div style="float:left">{{title}}</div>
        <el-button size="mini" type="primary" @click="updateJson()">保存</el-button>
        <el-button size="mini" type="info" @click="getJson()">重置</el-button>
    </div>
    <div style="margin:10px">
        <el-table v-loading="listLoading" :data="json_show" border style="width: 60%;float:left;" :row-style="showRow" max-height="850">
            <el-table-column label="结构">
                <template slot-scope="scope">
                    <span class="ms-tree-space"></span>
                    <span v-for="space in scope.row.level" class="ms-tree-space" :key="space"></span>
                    <span class="tree-ctrl" v-if="scope.row.isNode" @click="toggleExpanded(scope.row)">
                        <i v-if="!scope.row.isExpand" class="el-icon-plus"></i>
                        <i v-else class="el-icon-minus"></i>
                    </span>
                    {{scope.row.key}}

                </template>
            </el-table-column>
            <el-table-column label="值" width="500">
                <template slot-scope="scope">
                    <input v-if="scope.row.isNode==false" v-bind:value="scope.row.value" v-on:input="scope.row.value=$event.target.value;ressetObject($event.target.value, scope.row.path, scope.row.valueType);" class="specialinput">
                    <div v-else>
                        <el-tag type="success">{{scope.row.value}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="说明">
                <template slot-scope="scope">
                    <input v-model="json_note[scope.row.notekey]" class="specialinput">
                </template>
            </el-table-column>
        </el-table>
        <div style="width:40%; height:850px;overflow:scroll;">
            <JsonView :json="json_source" style="width: 100%;text-align:left;"></JsonView>
        </div>
    </div>
</div>
</template>

<script>
import setobj from '@/utils/setobj'
import JsonView from '@/components/JsonView/index.vue'

export default {
    name: 'JsonEditor',
    components: {
        JsonView
    },
    data() {
        return {
            json_source: {
                'x-small': {
                    name: '10px',
                    value: '1'
                },
                'small': {
                    name: '13px',
                    value: 20
                },
                'array': [{
                        name: '16px',
                        value: true
                    },
                    {
                        name: '18px',
                        value: '4'
                    }
                ]
            },
            json_note: {
                "x-small": "",
                "x-small|name": "",
                "x-small|value": "字符串",
                "small": "",
                "small|name": "",
                "small|value": "数字",
                "array": "",
                "array|0": "",
                "array|0|name": "",
                "array|0|value": "布尔",
                "array|1": "",
                "array|1|name": "",
                "array|1|value": ""
            },
            json_show: [],
            isExpand: 1,
            listLoading: false,
            title: 'JsonEditor'
        }
    },
    created() {
        this.getJson()
    },
    methods: {
        getJson: function () {
            this.json_show = this.treeToArray(this.json_source, 0, [], 1, this.isExpand)
            this.initJsonNode(this.json_show, this.json_note)
        },
        treeToArray: function (myObject, level = 0, path = [], isShow = 0, isExpand = 0) {
            let tmp = []

            for (var index in myObject) {
                let record = {}
                let tmppath = []
                tmppath = path.slice(0);
                tmppath.push(index)
                record.key = index
                record.level = level
                record.path = tmppath
                record.isShow = level == 0 ? 1 : isShow
                record.isExpand = isExpand
                record.notekey = tmppath.join("|")
                record.valueType = this.getType(myObject[index])
                if (typeof myObject[index] != 'object') {
                    record.value = myObject[index]
                    record.isNode = false
                    tmp.push(record)
                } else {
                    record.value = this.getType(myObject[index])
                    record.isNode = true
                    tmp.push(record)
                    if (isExpand == 1) {
                        isShow = 1
                    } else {
                        isShow = 0
                    }
                    let children = this.treeToArray(myObject[index], level + 1, tmppath, isShow, isExpand)
                    tmp = tmp.concat(children)
                }
            }
            return tmp
        },
        ressetObject: function (val, path, type) {
            if (type == "Number") {
                val = Number(val)
                if (isNaN(val)) {
                    this.$message.error("请输入一个数字")
                    return false
                }
            } else if (type == "Boolean") {
                val = val === 'true' ? true : false
            }
            setobj(this.json_source, path, val)
        },
        initJsonNode: function (jsonObj, noteObj) {
            for (let index in jsonObj) {
                if (this.json_note[jsonObj[index].notekey] == undefined) {
                    this.json_note[jsonObj[index].notekey] = ''
                }
            }
        },
        getType: function (value) {
            if (Object.prototype.toString.call(value) === "[object Array]") {
                return 'Array'
            } else if (Object.prototype.toString.call(value) === '[object Object]') {
                return 'Object'
            } else if (Object.prototype.toString.call(value) === '[object Boolean]') {
                return 'Boolean'
            } else if (Object.prototype.toString.call(value) === '[object Number]') {
                return 'Number'
            } else if (Object.prototype.toString.call(value) === '[object String]') {
                return 'String'
            } else {
                return ''
            }
        },
        showRow: function (row) {
            return row.row.isShow ? 'display:;' : 'display:none;'
        },
        toggleExpanded: function (row) {
            let pathLen = row.path.length
            let isExpand = row.isExpand == 1 ? 0 : 1;
            let tmpArr = this.json_show.map(function (item, index, json_show) {
                if (item.path.slice(0, pathLen).join("|") == row.path.slice(0, pathLen).join("|") && item.path.length == pathLen) {
                    item.isExpand = isExpand
                }
                if (item.path.slice(0, pathLen).join("|") == row.path.slice(0, pathLen).join("|") && item.path.length > pathLen) {
                    item.isExpand = isExpand
                    item.isShow = isExpand
                }
            })
        },
        updateJson: function () {
            console.log(this.json_source)
            console.log(JSON.stringify(this.json_note))
        }
    }

}
</script>

<style lang="scss" scoped>
$color-blue: #2196F3;
$space-width: 18px;

.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;

    &::before {
        content: ""
    }
}

.processContainer {
    width: 100%;
    height: 100%;
}

table td {
    line-height: 26px;
}

.tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
}

.specialinput {
    outline-style: none;
    width: 95%;
    height: 30px;
    border: 0px;
}
</style>
