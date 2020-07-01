import VModel from './alert/VModel'
import TablePage from './layout/TablePage'
import TableSearch from './layout/TableSearch'
import {DatePicker, Table, TableColumn, Pagination, Button, Input, Select, Option, ButtonGroup, Switch, Cascader, Tag} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const elComponent = [
    DatePicker,
    Table,
    TableColumn,
    Pagination,
    Button,
    Input,
    Select,
    Option,
    ButtonGroup,
    Switch,
    Cascader,
    Tag
];

const componentList = [VModel, TablePage, TableSearch, ...elComponent];

const components = {
    install(Vue) {
        componentList.forEach(item => {
            Vue.component(item.name, item)
        })
    }
};

export default components
