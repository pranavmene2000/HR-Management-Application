import NewEmpForm from './NavbarComponents/NewEmp'
import AllEmployees from './NavbarComponents/AllEmployees'
import LeaveForm from './NavbarComponents/LeaveAppln';
import MyLeaveAppln from './NavbarComponents/MyLeaveAppln';
import AllLeaveAppln from './NavbarComponents/AllLeaveApplns';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import SendIcon from '@material-ui/icons/Send';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ShareEmpCredentials from './NavbarComponents/ShareEmpCredentials';
import FaQ from './NavbarComponents/FaQ';
import Holidays from './NavbarComponents/Holidays';
import Policies from './NavbarComponents/Policies';
import Payroll from './NavbarComponents/Payroll';
import MySlips from './NavbarComponents/MySlips';
import Profile from './NavbarComponents/Profile';

export const routesAdmin = [
    {
        path: "/",
        exact: true,
        main: () => <NewEmpForm />,
        text: "Add employee",
        icon: <PersonAddIcon />
    },
    {
        path: "/all_employees",
        exact: true,
        main: () => <AllEmployees />,
        text: "All employees",
        icon: <PeopleAltIcon />
    },
    {
        path: "/leave_appln",
        exact: true,
        main: () => <AllLeaveAppln />,
        icon: <DescriptionIcon />,
        text: "Leave applications"
    },
    {
        path: "/payroll",
        exact: true,
        main: () => <Payroll />,
        icon: <AccountBalanceIcon />,
        text: "Payroll system"
    },
    {
        path: "/share",
        exact: true,
        main: () => <ShareEmpCredentials />,
        icon: <VpnKeyIcon />,
        text: "Share employee credentials"
    },
];

export const routesEmp = [
    {
        path: "/profile",
        exact: true,
        main: () => <Profile />,
        text: "My Profile",
        icon: <AccountCircleIcon />
    },
    {
        path: "/",
        exact: true,
        main: () => <LeaveForm />,
        text: "Request a Leave",
        icon: <SendIcon />
    },
    {
        path: "/my_l_appln",
        exact: true,
        main: () => <MyLeaveAppln />,
        text: "My Leave Requests",
        icon: <AllInboxIcon />
    },
    {
        path: "/my_slips",
        exact: true,
        main: () => <MySlips />,
        text: "Financial Record",
        icon: <CreditCardIcon />
    },
];

export const Docs = [
    {
        path: "/faq",
        exact: true,
        main: () => <FaQ />,
        text: "FAQ",
        icon: <LiveHelpIcon />
    },
    {
        path: "/holidays",
        exact: true,
        main: () => <Holidays />,
        text: "Holidays",
        icon: <FlightTakeoffIcon />
    },
    {
        path: "/policies",
        exact: true,
        main: () => <Policies />,
        text: "Privacy Policy",
        icon: <PolicyOutlinedIcon />
    },
]