
// MainStackParamList is the type of the route params for the MainStack
interface MainStackParamList {
    Home: undefined;
    MainTabs: undefined;

    Details: { itemId: number };
}

// RootStackParamList is the type of the route params for the RootStack
interface RootStackParamList {
    Main: undefined;
    MyModal: undefined;
}

// MainTabsParamList is the type of the route params for the MainTabs
interface MainTabsParamList {
    Home: undefined;
    Settings: undefined;
}

interface AuthStackParamList {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
}


export type { MainStackParamList, RootStackParamList, MainTabsParamList, AuthStackParamList };
