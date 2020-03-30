import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/admin/Home.vue'
import TicketsList from '../views/admin/tickets/index.vue'
import Tickets from '../views/admin/tickets/details.vue'
import Comments from '../views/admin/tickets/comments.vue'
import Statistics from '../views/admin/tickets/statistics.vue'
import Login from '../views/admin/Login.vue'

import Home from '../views/app/Home.vue'
import Advice from '../views/app/Advice.vue'
import AppointmentsList from '../views/app/AppointmentsList.vue'
import NewAppoint from '../views/app/NewAppoint.vue'
import SugarMeasurement from '../views/app/SugarMeasurement.vue'
import AddMeasurement from '../views/app/AddMeasurement.vue'
import BodyWeight from '../views/app/BodyWeight.vue'
import AddDrug from '../views/app/AddDrug.vue'
import AddMeal from '../views/app/AddMeal.vue'
import AddActivity from '../views/app/AddActivity.vue'
import AddWater from '../views/app/AddWater.vue'
import WeightStatistics from '../views/app/Statistics.vue'
import InquiriesList from '../views/app/InquiriesList.vue'
import AddTicket from '../views/app/AddTicket.vue'
import FoodPlan from '../views/app/FoodPlan.vue'
import MyAnalysis from '../views/app/MyAnalysis.vue'
import MyDrugs from '../views/app/MyDrugs.vue'
import Profile from '../views/app/Profile.vue'
import AddAnalyse from '../views/app/AddAnalyse.vue'
import AddMedicine from '../views/app/AddMedicine.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/admin/users',
        name: 'Users',
        meta: {layout: 'default'},
        component: Users,
    },
    {
        path: '/admin/login',
        name: 'Login',
        meta: {layout: 'auth'},
        component: Login
    },
    {
        path: '/admin/:user/details',
        name: 'ticketsDetails',
        meta: {layout: 'default'},
        component: Tickets,
    },
    {
        path: '/admin/tickets',
        name: 'tickets',
        meta: {layout: 'default'},
        component: TicketsList,
    },
    {
        path: '/admin/tickets/:user/comments',
        name: 'comments',
        meta: {layout: 'default'},
        component: Comments,
    },
    {
        path: '/admin/tickets/:user/statistics',
        name: 'statistics',
        meta: {layout: 'default'},
        component: Statistics,
    },
    {
        path: '/',
        name: 'Home',
        meta: {layout: 'mobile'},
        component: Home,
    },
    {
        path: '/advice',
        name: 'Advice',
        meta: {layout: 'mobile'},
        component: Advice,
    },
    {
        path: '/appointments',
        name: 'appointments',
        meta: {layout: 'mobile'},
        component: AppointmentsList,
    },
    {
        path: '/appointment',
        name: 'newAppoint',
        meta: {layout: 'mobile'},
        component: NewAppoint,
    },
    {
        path: '/measurement',
        name: 'sugarMeasurement',
        meta: {layout: 'mobile'},
        component: SugarMeasurement,
    },
    {
        path: '/add-measurement',
        name: 'addMeasurement',
        meta: {layout: 'mobile'},
        component: AddMeasurement,
    },
    {
        path: '/weight',
        name: 'weight',
        meta: {layout: 'mobile'},
        component: BodyWeight,
    },
    {
        path: '/add-drug',
        name: 'addDrug',
        meta: {layout: 'mobile'},
        component: AddDrug,
    },
    {
        path: '/add-meal',
        name: 'addMeal',
        meta: {layout: 'mobile'},
        component: AddMeal,
    },
    {
        path: '/add-activity',
        name: 'addActivity',
        meta: {layout: 'mobile'},
        component: AddActivity,
    },
    {
        path: '/add-water',
        name: 'addWater',
        meta: {layout: 'mobile'},
        component: AddWater,
    },
    {
        path: '/weight-statistics',
        name: 'WeightStatistics',
        meta: {layout: 'mobile'},
        component: WeightStatistics,
    },
    {
        path: '/inquiries-list',
        name: 'InquiriesList',
        meta: {layout: 'mobile'},
        component: InquiriesList,
    },
    {
        path: '/add-ticket',
        name: 'AddTicket',
        meta: {layout: 'mobile'},
        component: AddTicket,
    },
    {
        path: '/food-plan',
        name: 'FoodPlan',
        meta: {layout: 'mobile'},
        component: FoodPlan,
    },
    {
        path: '/my-analysis',
        name: 'analysis',
        meta: {layout: 'mobile'},
        component: MyAnalysis,
    },
    {
        path: '/my-drugs',
        name: 'myDrugs',
        meta: {layout: 'mobile'},
        component: MyDrugs,
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {layout: 'mobile'},
        component: Profile,
    },
    {
        path: '/add-analyse',
        name: 'analyse',
        meta: {layout: 'mobile'},
        component: AddAnalyse,
    },
    {
        path: '/add-medicine',
        name: 'medicine',
        meta: {layout: 'mobile'},
        component: AddMedicine,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
