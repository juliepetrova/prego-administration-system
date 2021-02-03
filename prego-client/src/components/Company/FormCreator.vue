<template>
    <div class="container mx-auto min-h-screen h-screen flex mt-10 text-gray-800"
         :style="`--main-bg-color: ${accentColor};`">
        <div v-if="show===false"
             class="flex flex-col justify-between pb-4 w-1/4 bg-gray-100 border-2 rounded-l-lg border-r-2 overflow-y-scroll">
            <div>
                <div v-if="show===false"
                     class="bg-purple-100 w-full border-t-4 border-purple-600 rounded-b text-teal-900 px-4 py-3 shadow-md mb-8"
                     role="alert">
                    <div class="flex">
                        <svg class="h-6 w-6 text-purple-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                        <div>
                            <p class="font-bold">You can drag and drop elements into the form.</p>
                            <p class="text-sm">You can then edit, delete or reorder them.</p>
                        </div>
                    </div>
                </div>
                <div class="text-center text-gray-700 text-lg my-4">
                    Form Settings:
                </div>
                <FormulateInput label="Form Name" type="text" v-model="formName" class="w-4/5 mx-auto text-gray-700"/>
                <FormulateInput
                        type="color"
                        v-model="accentColor"
                        :value="accentColor"
                        class="mx-auto w-4/5"
                        name="sample"
                        label="Form Accent Color"
                        placeholder="Form Accent Color"
                        help="Color for Button and other accents."
                        error-behavior="live"
                />
                <div class="text-center text-gray-700 text-lg my-4">
                    Form Elements:
                </div>
                <draggable :list="elements"
                           :group="{ name: 'elements', pull: 'clone', put: false }"
                           :clone="addField"
                           class="flex flex-wrap justify-center">
                    <button v-for="(element,index) in elements" :key="index"
                            class="w-2/5 rounded-lg border-gray-400 border-2 shadow-lg bg-white hover:bg-gray-200 text-gray-700 text-xl py-2 m-2 focus:outline-none">
                        {{element.type}}
                    </button>
                </draggable>
            </div>
            <button @click="saveForm"
                    class="w-2/5 mt-6 mx-auto px-4 py-2 bg-purple-500 rounded-lg text-white border-2 border-purple-600 hover:bg-purple-600 hover:border-purple-800">
                Save Form
            </button>
        </div>
        <div class="flex-1 flex overflow-hidden">
            <div @click="selectedElement=''"
                 class="flex flex-col items-center flex-1 bg-white rounded-lg rounded-l-none overflow-y-scroll py-8">
                <div v-if="show===false" class="text-3xl mb-8 font-sans text-gray-800">{{formName}}</div>
                <div v-if="(items.length===0 || show===true) && !exists " class="flex-column my-auto text-center">
                    <img src="https://cdn.jotfor.ms//myforms3/img/newui/icons/emptyFormList.svg" class="mx-auto mb-4"
                         height="180">
                    <h2 class="text-3xl">You don't have a form yet.</h2>
                    <h3 class="text-2xl mb-10">Your form will appear here.</h3>
                    <button @click="show=false"
                            class="text-xl border-4 border-dashed border-blue-500 rounded-lg px-4 py-2 mb-10 focus:outline-none hover:bg-blue-500 hover:border-transparent hover:text-white">
                        Create a form
                    </button>
                </div>
                <FormulateForm v-if="show===false" v-model="values">
                    <draggable
                            class="list-group"
                            group="elements"
                            :list="items"
                            v-bind="dragOptions"
                            @start="drag = true"
                            @end="drag = false"
                    >
                        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                            <div class="flex mb-8"
                                 v-for="(item,index) in items"
                                 :key="item.name">
                                <FormulateInput
                                        v-bind="item"
                                        v-if="item.name != 'duration' || (item.name === 'duration' && values.isLonger === true)"
                                >
                                    <template v-if="item.name==='Terms of Use'" #label="{ label, id }">
                                        <label class="font-semibold text-sm ml-2" :for="id">
                                            I agree to the
                                            <router-link class="text-blue-600 hover:underline" to="/termsandconditions">
                                                Terms of Use
                                            </router-link>
                                            and GDPR
                                        </label>
                                    </template>
                                </FormulateInput>
                                <div class="flex"
                                     v-if="item.name != 'duration' || (item.name === 'duration' && values.isLonger === true)">
                                    <button v-if="item.name != 'Terms of Use'"
                                            class="text-green-500 ml-5 self-start focus:outline-none"
                                            @click="selectedEl = index">
                                        <svg class="w-6 h-6 transform hover:-translate-y-1  hover:scale-110 transition duration-500 ease-in-out hover:text-green-600"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                    </button>
                                    <button class="text-red-500 ml-5 self-start focus:outline-none"
                                            v-if="(item.type != 'submit' &&
                                            item.type != 'datetime-local' &&
                                            item.name != 'duration' &&
                                            item.name != 'isLonger') &&
                                            item.name != 'firstname' &&
                                            item.name != 'lastname' &&
                                            item.name != 'email' &&
                                            item.name != 'Terms of Use' &&
                                            item.name != 'visitorReports' &&
                                            items.length > 2"
                                            @click="items.splice(index,1)">
                                        <svg class="w-6 h-6 transform hover:-translate-y-1  hover:scale-110 transition duration-500 ease-in-out hover:text-red-600"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </transition-group>
                    </draggable>
                </FormulateForm>
            </div>
        </div>
        <div v-if="selectedEl !== ''" class="w-1/4 bg-white rounded-r-lg overflow-y-scroll pb-6">
            <div class="flex justify-between text-center text-lg my-4 px-4 ">
                <div class="text-gray-700">Properties:</div>
                <button @click="selectedEl = ''">
                    <svg class="w-6 h-6 text-gray-600 hover:bg-gray-200 rounded-full" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <hr>
            <FormulateInput
                    v-if="items[selectedEl].type === 'file'"
                    v-model="items[selectedEl].type"
                    :options="{file: 'File', image: 'Image'}"
                    class="mt-4 w-4/5 mx-auto text-gray-700"
                    type="select"
                    placeholder="Select a type"
                    label="Type of file"
            />
            <FormulateInput label="Label" type="text" v-model="items[selectedEl].label"
                            class="mt-4 w-4/5 mx-auto text-gray-700"/>
            <FormulateInput label="Placeholder" type="text" v-model="items[selectedEl].placeholder"
                            class="mt-4 w-4/5 mx-auto text-gray-700"/>
            <FormulateInput label="Help" type="text" v-model="items[selectedEl].help"
                            class="mt-4 w-4/5 mx-auto text-gray-700"/>
            <FormulateInput
                    v-if="items[selectedEl].type === 'radio' || items[selectedEl].type === 'select'"
                    type="group"
                    class=" w-4/5 mx-auto text-gray-700 py-4"
                    name="options"
                    :repeatable="true"
                    label="Options"
                    add-label="+ Add Option"
            >
                <div v-for="(option,index) in items[selectedEl].options" :key="index">
                    <FormulateInput
                            name="Label"
                            :label="`Label ` + (index)"
                            class="w-4/5"
                            v-model="items[selectedEl].options[index].label"
                    />
                </div>
            </FormulateInput>
            <FormulateInput
                    class="mt-4 w-4/5 mx-auto text-gray-700"
                    v-model="items[selectedEl].validation[0]"
                    :options="{required: 'Required',bail: 'Bail',email: 'Email', number: 'Number'}"
                    type="checkbox"
                    label="Validation"
            />
            <div class="flex justify-between px-4" v-if="items[selectedEl].type==='range'">
                <FormulateInput
                        type="number"
                        name="range"
                        class="mt-4 w-2/5 mx-auto text-gray-700"
                        v-model="items[selectedEl].min"
                        label="Min"
                        placeholder="0"
                        help=""
                        error-behavior="live"
                />
                <FormulateInput
                        type="number"
                        name="range"
                        class="mt-4 w-2/5 mx-auto text-gray-700"
                        v-model="items[selectedEl].max"
                        label="Max"
                        placeholder="100"
                        help=""
                        error-behavior="live"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import VueFormulate from '@braid/vue-formulate'
    import draggable from 'vuedraggable'
    import Vue from 'vue'
    import axios from 'axios'

    Vue.use(VueFormulate)

    export default {
        name: "FormCreator",
        components: {
            draggable
        },
        data() {
            return {
                exists: true,
                company_id: '',
                company_name: '',
                show: true,
                formName: "Custom Form",
                selectedEl: '',
                elements: [
                    {
                        type: 'Name',
                    },
                    {
                        type: 'Email',
                    },
                    {
                        type: 'Phone',
                    },
                    {
                        type: 'File'
                    },
                    {
                        type: 'Time Picker'
                    },
                    {
                        type: 'Slider'
                    },
                    {
                        type: 'Select'
                    },
                    {
                        type: 'Checkbox'
                    },
                    {
                        type: 'Radio'
                    },
                    {
                        type: 'Custom'
                    }
                ],
                accentColor: "#3eaf7c",
                validation: [],
                values: {},
                items: [
                    {
                        type: 'text',
                        name: 'firstname',
                        label: 'What is your first name?',
                        placeholder: 'Your first name...',
                        validation: ['required']
                    },
                    {
                        type: 'text',
                        name: 'lastname',
                        label: 'What is your last name?',
                        placeholder: 'Your last name...',
                        validation: ['required']
                    },
                    {
                        type: 'email',
                        name: 'email',
                        label: 'What is your email?',
                        placeholder: 'Your email...',
                        validation: ['required']
                    },
                    {
                        type: 'datetime-local',
                        name: 'date-start',
                        label: 'Select a time to visit',
                        validation: ['required']
                    },
                    {
                        type: "checkbox",
                        name: 'isLonger',
                        label: 'My meeting will last longer than 30 min.',
                        validation: []
                    },
                    {
                        type: "checkbox",
                        name: 'visitorReports',
                        label: 'I am not from restricted location - Veldhoven.',
                        help: 'Staff in Ede is not allowed to see Veldhoven visitors.',
                        validation: ['required']
                    },
                    {
                        type: "checkbox",
                        name: 'Terms of Use',
                        validation: ['required']
                    },
                    {
                        type: "select",
                        name: 'duration',
                        label: "Please select duration of your meeting",
                        options: {'15': '15', '30': '30', '45': '45', '60': '60'},
                        validation: ['required']
                    },
                    {
                        type: "select",
                        name: 'employee',
                        label: "Who are you visiting",
                        options: JSON.stringify(this.employeesArray),
                        validation: ['required']
                    },
                    {
                        name: 'submit',
                        type: 'submit',
                        label: 'Submit',
                    }
                ],
                drag: false,
                employees: [],
                employeesArray: [],
            }
        },
        created() {
            axios.get('http://localhost:8000/api/companies/?name=' + this.$route.params.company_name)
                .then(response => {
                    this.company_id = response.data[0].id
                    this.company_name = response.data[0].company_name
                    axios.get('/api/companies/' + this.company_id + '/form')
                        .then(response => {
                            console.log(response.data)
                            if(response.data[0] !== undefined){
                                this.exists = true;
                                if(confirm('Form already exists! Do you want to delete it?')){
                                    axios.delete('/api/companies/' + this.company_id + '/form')
                                        .then(response => {
                                            console.log(response)
                                            alert('deleted')
                                        })
                                    this.exists = false;
                                    this.show= true;
                                }
                                else{
                                    this.show = false;
                                }
                            }
                            else{
                                this.exists = false;
                                this.show = true;
                            }
                        })
                    axios.get('http://localhost:8000/api/employees/?company_id=' + this.company_id)
                        .then(resp => {
                            this.employees = resp.data;
                            this.employees.forEach(emp => {
                                this.employeesArray.push({
                                    label: emp.label,
                                    value: emp.value,
                                    id: emp.id
                                })
                            })
                            console.log(JSON.stringify(this.employeesArray));
                        })
                })


        },
        methods: {
            addField(type) {
                type = JSON.parse(JSON.stringify(type))
                if (type.type === 'Name') {
                    return {
                        "label": "Your name",
                        "name": "name",
                        "validation": [["required"]]
                    }
                } else if (type.type === 'Email') {
                    return {
                        "label": "Your email",
                        "name": "email",
                        "placeholder": "Type your email",
                        "help": "Please use your student email address",
                        "validation": [["bail"], ["required"], ["email"], ["ends_with", ".edu"]],
                        "validation-messages": {
                            "ends_with": "Please use a .edu email address"
                        }
                    }
                } else if (type.type === 'Phone') {
                    return {
                        "type": "tel",
                        "name": "phone",
                        "label": "Telephone Number",
                        "placeholder": "+3590000001",
                        "help": "",
                        "validation": [["required"]],
                    }
                } else if (type.type === 'File') {
                    return {
                        "type": "file",
                        "name": "file",
                        "label": "Select your documents to upload",
                        "help": "Select one or more PDFs to upload",
                        "validation": [["mime:application/pdf"]],
                        "multiple": true
                    }
                } else if (type.type === 'Time Picker') {
                    return {
                        "type": "time",
                        "name": "time",
                        "label": "Select a time",
                        "help": "You can select a time",
                        "validation": [],
                    }
                } else if (type.type === 'Slider') {
                    return {
                        "label": "How long do you think you’ll live?",
                        "type": "range",
                        "name": "range",
                        "min": "0",
                        "max": "100",
                        "value": "45",
                        "validation": [["required"], ["min:10"], ["max:90"]],
                        "error-behavior": "live",
                        "show-value": true
                    }
                } else if (type.type === 'Radio') {
                    return {
                        "type": 'radio',
                        "name": 'method',
                        "label": 'Are you healthy?',
                        "options": [
                            {"value": 'option1', "id": 'option1', "label": 'I am perfectly healthy.'},
                            {"value": 'option2', "id": 'option2', "label": 'I have a cold.'},
                            {"value": 'option3', "id": 'option3', "label": 'I have other symptoms.'}
                        ],
                        "value": 'option1',
                        'validation-name': 'Health check',
                        "validation": [['required']]
                    }
                } else if (type.type === 'Checkbox') {
                    return {
                        "type": "checkbox",
                        "label": "My meeting will last longer than 30 min.",
                        "name": "checkbox",
                        "validation": []
                    }
                } else if (type.type === 'Select') {
                    return {
                        "type": "select",
                        "options": {"first": 'First', "second": 'Second', "third": 'Third', "fourth": 'Fourth'},
                        "label": "Select an option",
                        "name": "select",
                        "validation": []
                    }
                } else if (type.type === 'Custom') {
                    return {
                        "label": "Custom Label",
                        "name": "custom",
                        "validation": []
                    }

                }
            }
            ,
            saveForm() {
                this.items.forEach(x => {
                    if (x.name === 'employee') {
                        x.options = this.employeesArray;
                    }
                })
                let formJson = JSON.stringify(this.items);
                console.log(formJson)
                console.log(this.items)
                console.log(this.accentColor)
                console.log(this.formName)
                let data = {
                    "json_form": formJson,
                    "accent_color": this.accentColor,
                    "form_name": this.formName,
                    "company_id": this.company_id
                };

                axios.post('http://localhost:8000/api/companies/' + this.company_id + '/form', data)
                    .then(response => {
                        console.log(response.data)
                        this.$router.back();
                    })
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "elements",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        }
    }
</script>

<style scoped>

    .button {
        margin-top: 35px;
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }

    .ghost {
        opacity: 0.5;
        background: #dedede;
    }

    .list-group {
        min-height: 20px;
    }

    .list-group-item {
        cursor: move;
    }

    .list-group-item i {
        cursor: pointer;
    }
</style>
