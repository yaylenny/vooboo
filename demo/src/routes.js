import Home from "./sections/main.vue";

import Components from "./sections/components/components.vue";
import ComponentsOverview from "./sections/components/overview.vue";
import Table from "./sections/components/table.vue";
import Tree from "./sections/components/tree.vue";
import Modal from "./sections/components/modal.vue";
import AutoComplete from "./sections/autocomplete.vue";
import Datepicker from "./sections/datepicker.vue";

import Forms from "./sections/forms.vue";
import Models from "./sections/models.vue";

const routes=[
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/components/autocomplete',
    name: 'components/autocomplete',
    component: AutoComplete
  },
  {
    path: '/components/datepicker',
    name: 'components/datepicker',
    component: Datepicker
  },
  {
    path: '/components/table',
    name: 'components/table',
    component: Table
  },
  {
    path: '/components/modal',
    name: 'components/modal',
    component: Modal
  },
  {
    path: '/components/tree',
    name: 'components/tree',
    component: Tree
  },
  {
    path: '/components',
    component: Components,
    children:[
      {
        path: '',
        name: 'components',
        component: ComponentsOverview
      },
    ]
  },
  {
    path: '/forms',
    component: Forms,
    name: 'forms'
  },
  {
    path: '/models',
    component: Models,
    name: 'models'
  },
];

export default routes;
