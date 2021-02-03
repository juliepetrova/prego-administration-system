import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import DashboardBuildingOwner from '@/components/buildingOwner/Dashboard'
import CompaniesHome from "@/components/home/CompaniesHome";
import LandingPage from "../components/LandingPage";
import CompanyIndex from "../components/Company/CompanyIndex";
import store from '../store/index'
import FormCreator from "../components/Company/FormCreator";
import DashboardCompanyOwner from "@/components/Company/Dashboard";
import FormPage from "../components/Company/FormPage";
import EmployeeDashboard from "@/components/employee/Dashboard"
import TermsAndConditions from "@/components/legal/TermsAndConditions";
import EvacuationRoutes from "@/components/legal/EvacuationRoutes";
import DashboardAdmin from "@/components/admin/Dashboard";
import WelcomeMessage from "../components/WelcomeMessage";
import GoodbyeMessage from "../components/GoodbyeMessage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/building/dashboard',
        component: DashboardBuildingOwner,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/companies',
        component: CompaniesHome
    },
    {
        path: '/company/:company_name',
        component: CompanyIndex,
    },
    {
        path: '/company/:company_name/form/settings',
        component: FormCreator,
        requiresAuth: true
    },
    {
        path: '/company/:id/form/',
        component: FormPage,
    },
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/office/dashboard',
        component: DashboardCompanyOwner,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/employee/dashboard',
        component: EmployeeDashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/termsandconditions',
        component: TermsAndConditions
    },
    {
        path: '/evacuationroute',
        name: 'evacuationroute',
        component: EvacuationRoutes,
        props: true
    },
    {
        path: '/admin/dashboard',
        component: DashboardAdmin,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/welcome/:name',
        component: WelcomeMessage,
        props: true
    },
    {
        path: '/goodbye/:name',
        component: GoodbyeMessage,
        props: true
    }

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    // mode: 'history',
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router

