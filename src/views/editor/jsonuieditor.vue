<template>
<el-row>
    <el-col :span="12">
        <el-card class="form">
            <json-editor ref="JsonEditor" :schema="schema" v-model="model">
                <el-button type="primary" @click="submit">Subscribe</el-button>
                <el-button type="reset" @click="reset">Reset</el-button>
            </json-editor>
        </el-card>
    </el-col>
    <el-col :span="12">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Model</span>
            </div>
            <pre class="json">{{ jsonString }}</pre>
        </el-card>
        <br />
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>How to use</span>
            </div>
            <div class="json">
                <p>GitHub: <a href="https://github.com/yourtion/vue-json-ui-editor" target="_blank">vue-json-ui-editor</a></p>
                <p>NPM: <a href="https://www.npmjs.com/package/vue-json-ui-editor" target="_blank">json-editor</a></p>
            </div>
        </el-card>
    </el-col>
</el-row>
</template>

<script>
const SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "title": "Json-Editor-Demo",
    "description": "Demo for vue-json-ui-editor using element-ui ",
    "properties": {
        "name": {
            "type": "string",
            "minLength": 8,
            "maxLength": 80,
            "title": "String",
            "attrs": {
                "placeholder": "Your Full Name",
                "title": "Please enter your full name"
            }
        },
        "sub": {
            "title": "SubTitle",
            "description": "SubDescription",
            "type": "object",
            "properties": {
                "sName": {
                    "minLength": 8,
                    "maxLength": 80,
                    "title": "SubName",
                    "attrs": {
                        "placeholder": "Sub Full Name",
                        "title": "Please enter your full name"
                    }
                },
                "sUrl": {
                    "title": "SubUrl",
                    "format": "uri"
                },
                "sub2": {
                    "type": "object",
                    "title": "Sub2Title",
                    "description": "Sub2Description",
                    "properties": {
                        "sName2": {
                            "format": "regex",
                            "title": "Sub2Name",
                            "pattern": "*"
                        },
                        "sAge": {
                            "type": "integer",
                            "title": "Sub2Age"
                        }
                    },
                    "required": ["sName2"]
                }
            },
            "required": ["sUrl"]
        },
        "lists": {
            "type": "string",
            "title": "List",
            "enum": ["Daily New", "Promotion"],
            "attrs": {
                "placeholder": "Select your list subscription",
                "title": "Please select your list subscription"
            }
        },
        "lists2": {
            "type": "array",
            "title": "List2",
            "anyOf": [{
                    "value": "daily",
                    "label": "Daily New"
                },
                {
                    "value": "promotion",
                    "label": "Promotion"
                }
            ],
            "attrs": {
                "placeholder": "Select your list subscription",
                "title": "Please select your list subscription"
            }
        },
        "lists3": {
            "type": "array",
            "title": "List3",
            "oneOf": [{
                    "value": "daily",
                    "label": "Daily New"
                },
                {
                    "value": "promotion",
                    "label": "Promotion"
                }
            ]
        },
        "source": {
            "type": "string",
            "maxLength": 120,
            "title": "Source",
            "description": "Ex. Using the NPM Search Engine",
            "attrs": {
                "type": "textarea",
                "placeholder": "How did you hear about us?"
            }
        },
        "rate": {
            "type": "number",
            "title": "Rate",
            "default": 2,
            "attrs": {
                "type": "rate",
                "allow-half": true
            }
        },
        "color": {
            "type": "string",
            "title": "Color",
            "default": "#409EFF",
            "attrs": {
                "type": "color"
            }
        },
        "agree": {
            "type": "boolean",
            "title": "Agree",
            "description": "You agree to receive occasional updates and special offers for vue-json-schema updates.",
            "default": false,
            "attrs": {
                "type": "switch"
            }
        }
    },
    "additionalProperties": false,
    "required": ["name", "email", "lists"]
};
// import vue-json-ui-editor
import JsonEditor from 'vue-json-ui-editor';
JsonEditor.setComponent('form', 'el-form', ({ vm }) => {
  // vm is the JsonEditor VM
  const labelWidth = '120px';
  const model = vm.data;
  const rules = {};
  function parseField(fields) {
    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0 && key !== '$sub') return;
      const field = fields[key];
      if (field.$sub) {
        return parseField(field);
      }
      if (!field.name) return;
      rules[field.name] = [];
      // http://element.eleme.io/#/en-US/component/form#validation
      const type = field.schemaType === 'array' && field.type === 'radio' ? 'string' : field.schemaType;
      const required = field.required;
      const message = field.title;
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type) ? 'change' : 'blur';
      rules[field.name].push({ type, required, message, trigger });
      if (field.minlength !== undefined || field.maxlength !== undefined) {
        const max = field.maxlength || 255;
        const min = field.minlength || 0;
        const msg = `Length must between ${ min } and ${ max }`;
        rules[field.name].push({ min, max, message: msg, trigger });
      }
    });
  }
  parseField(vm.fields);
  // returning the form props
  return { labelWidth, rules, model };
});

JsonEditor.setComponent('label', 'el-form-item', ({
    field
}) => ({
    prop: field.name,
}));

JsonEditor.setComponent('email', 'el-input');
JsonEditor.setComponent('url', 'el-input');
JsonEditor.setComponent('number', 'el-input-number');
JsonEditor.setComponent('text', 'el-input');
JsonEditor.setComponent('textarea', 'el-input');
JsonEditor.setComponent('checkbox', 'el-checkbox');
JsonEditor.setComponent('checkboxgroup', 'el-checkbox-group');
JsonEditor.setComponent('radio', 'el-radio');
JsonEditor.setComponent('select', 'el-select');
JsonEditor.setComponent('switch', 'el-switch');
JsonEditor.setComponent('color', 'el-color-picker');
JsonEditor.setComponent('rate', 'el-rate');
// You can also use the component object
JsonEditor.setComponent('option', Option);
// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
JsonEditor.setComponent('title', 'h2');
// By default `<p/>` is used to render the form title.
// To override this, use the `description` type:
JsonEditor.setComponent('description', 'small');
// By default `<div/>` is used to render the message error.
// To override this, use the `error` type:
JsonEditor.setComponent('error', 'el-alert', ({
    vm
}) => ({
    type: 'error',
    title: vm.error,
}));
export default {
    name: 'JsonUiEditor',
    components: {
        JsonEditor
    },
    data: () => ({
        // init json schma file ( require('@/schema/newsletter') )

        schema: SCHEMA,
        // data
        model: {
            name: 'Yourtion',
        },
    }),
    computed: {
        jsonString() {
            return JSON.stringify(this.model, null, 2).trim();
        },
    },
    methods: {
        submit(_e) {
            alert(JSON.stringify(this.model));
        },
        reset() {
            this.$refs.JsonEditor.reset();
        },
    },
};
</script>
<style>
.form {
  text-align: left;
  width: 90%;
  margin: auto;
}
h2 {
  font-size: 1.7em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.2em;
}
h2 + small {
  display: block;
  text-align: center;
  margin-bottom: 1.2em;
}
small {
  line-height: 20px;
  display: block;
}
.el-alert {
  margin-bottom: 15px;
}
.el-form .sub {
  margin-left: 10%;
}
.json {
  text-align: left;
}
</style>
