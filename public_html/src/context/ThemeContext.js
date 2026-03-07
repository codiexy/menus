import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { UserAuth } from './AuthContext';
import { Setting } from '../classes';

const SiteThemeContext = createContext();

const defaultColors = {
    button: {
        text: "",
        background: "",
        border: ""
    }
};

export const SiteThemeProvider = ({ children }) => {
    const { user, updateLoginUser } = UserAuth();
    const [mode, setMode] = useState(user?.theme || "light");
    const [colors, setColors] = useState(defaultColors);

    useEffect(() => {
        if (user) {
            const allColors = user.setting.filter(data => data.type === "color");
            let newColors = defaultColors;
            Object.keys(defaultColors).forEach(value => {
                let elementColors = allColors.find(data => data.id === value);
                Object.keys(defaultColors[value]).forEach(innerValue => {
                    newColors[value][innerValue] = elementColors?.[innerValue] || defaultColors[value][innerValue];
                });
            });
            setColors(newColors);
        }
    }, [user]);

    const handleThemeMode = async (mode = "light") => {
        await updateLoginUser({
            theme: mode
        })
        setMode(mode);
    }

    const handleThemeColors = async (newColors, colorType = "button") => {
        try {
            let result;
            const inputData = {
                type: "color",
                ...newColors
            };
            const settingClass = new Setting(user.restaurant.id);
            const getColorTypeData = await settingClass.first(colorType);
            if (getColorTypeData.status) {
                result = await settingClass.update(getColorTypeData.data.id, inputData)
            } else {
                result = await settingClass.insert(inputData, colorType);
            }
            if (result.status) {
                setColors(newColors);
            }

        } catch (error) {

        }
    }


    return (
        <SiteThemeContext.Provider
            value={{
                useThemeMode: () => [mode, handleThemeMode],
                useThemeColor: () => [colors, handleThemeColors],
            }}
        >
            {children}
        </SiteThemeContext.Provider>
    );
};

export const useSiteTheme = () => {
    return useContext(SiteThemeContext);
};