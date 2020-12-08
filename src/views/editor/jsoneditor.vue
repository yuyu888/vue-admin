<template >
<div>
    <p>vue-json-editor</p>
    <vue-json-editor v-model="json" :show-btns="true" :mode="'code'" style="height: 420px" lang="zh" @json-change="onJsonChange" @json-save="onJsonSave" @has-error="onError"></vue-json-editor>
</div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {
    name: 'JsonEditor',
    data() {
        return {
            json: {
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
            }
        }
    },

    components: {
        vueJsonEditor
    },
    computed: {},
    methods: {
        onJsonChange(value) {
            console.log('value:', value);
        },
        onJsonSave(value) {
            console.log('value:', value);
        },
        onError(value) {
            console.log('value:', value);
        }

    }
}
</script>

<style>
.jsoneditor-vue {
    height: 100%;
}
</style>
