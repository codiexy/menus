"use client"
import { createContext, useContext, useEffect, useState } from 'react';

import Setting from '@/classes/Setting';
import Tenant from '@/classes/Tenant';
import { notFound, useParams } from 'next/navigation';
import AuthProvider from './AuthContext';
import { auth as firebaseAuth } from "@/firebase";
import { Auth } from 'firebase/auth';
import { useMenuverse } from './MenuverseContext';
import { ThemeProvider, createTheme } from '@mui/material';

interface TenantContextProps {
    useThemeMode: () => [string, (mode: any) => void],
    useThemeColor: () => [any, (colors: any, type: string) => void],
    tenantId: string | null;
    tenant: any;
    tenantSlug: string;
    auth: Auth;
    setSnackbar: (status: boolean, message: string) => void,
    updateTenant: (data: any) => void,
    isLoading: boolean,
    setLoading: (data: any) => void,
}

const defaultColors: any = {
    button: {
        text: "",
        background: "",
        border: ""
    }
};

const TenantContext = createContext<TenantContextProps>({
    useThemeMode: () => ["light", (mode: any) => {}],
    useThemeColor: () => [defaultColors, (colors: any, type: string) => {}],
    tenantId: "",
    tenant: false,
    tenantSlug: "",
    auth: firebaseAuth,
    setSnackbar: (status = false, message = "") => {},
    updateTenant: async (data: any) => {},
    isLoading: true,
    setLoading: async (data: any) => {},
});

const TenantProvider = ({ children, tenant_slug = "" }: any) => {
    const { setSnackbar }: any = useMenuverse();
    const [auth, setAuth] = useState<Auth>(firebaseAuth);
    const [tenantId, setTenantId] = useState(null);
    const [mode, setMode] = useState("light");
    const [colors, setColors] = useState(defaultColors);
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(tenant == undefined || tenant == null);

    const params = useParams();
    // const theme = createTheme();
    const tenantSlug: any = params.tenant || tenant_slug;

    useEffect(() => {
        async function init_tenant() {
            setLoading(true);
            const tenantClass = new Tenant();
            const tenantData = await tenantClass.currentTenant(tenantSlug);
            if (tenantData) {
                // Update Tenant Id
                setTenantId(tenantData.id);
                // Update Tenant Data
                setTenant(tenantData);
                // Update Auth Tenant Id
                const newAuth = firebaseAuth;
                newAuth.tenantId = tenantData.id;
                setAuth(newAuth);
                // Get Tenant Setting Data
                const settingClass = new Setting(tenantData.id);
                const settingData = await settingClass.get();
                const allColors = settingData.filter((data: any) => data.type === "color");
                let newColors = defaultColors;
                Object.keys(defaultColors).forEach(value => {
                    let elementColors = allColors.find((data: any) => data.id === value);
                    Object.keys(defaultColors[value]).forEach(innerValue => {
                        newColors[value][innerValue] = elementColors?.[innerValue] || defaultColors[value][innerValue];
                    });
                });
                setColors(newColors);
                setLoading(false);
            }
            setLoading(false);
        }
        init_tenant();
    }, [tenantSlug]);

    const setThemeMode = async (mode = "light") => {
        setMode(mode);
    }

    const updateTenant = async (data: any) => {
        if (tenantId) {
            const tenantClass = new Tenant();
            const res = await tenantClass.update(tenantId, data);
            setSnackbar(res.status, res.message);
        } else {
            setSnackbar(false, "Tenant Not Found!");
        }
    }

    const handleThemeColors = async (newColors: object, colorType = "button") => {
        try {
            let result;
            const inputData = {
                type: "color",
                ...newColors
            };
            const settingClass = new Setting(tenantId);
            const getColorTypeData = await settingClass.first(colorType);
            if (getColorTypeData) {
                result = await settingClass.update(getColorTypeData.id, inputData)
            } else {
                result = await settingClass.insert(inputData, colorType);
            }
            if (result.status) {
                setColors(newColors);
            }

        } catch (error: any) {
            setSnackbar(false, error.message);
        }
    }

    if (!loading && !tenant) {
        notFound();
    }

    return (
        <TenantContext.Provider
            value={{
                useThemeMode: () => [mode, setThemeMode],
                useThemeColor: () => [colors, handleThemeColors],
                tenantId,
                tenant,
                tenantSlug,
                auth,
                setSnackbar,
                updateTenant,
                isLoading: loading,
                setLoading
            }}
        >
            {/* <ThemeProvider theme={theme}> */}
                <AuthProvider
                    isLoading={loading}
                    useThemeMode={() => [mode, setThemeMode]}
                    useThemeColor={() => [colors, handleThemeColors]}
                    tenantId={tenantId || ""}
                    tenant={tenant}
                    tenantSlug={params.tenant || tenant_slug}
                    auth={auth}
                    setSnackbar={setSnackbar}
                    updateTenant={updateTenant}
                    setLoading={setLoading}
                >
                    {children}
                </AuthProvider>
            {/* </ThemeProvider> */}
        </TenantContext.Provider>
    );
};

export const useTenant = () => {
    return useContext(TenantContext);
};

export default TenantProvider;