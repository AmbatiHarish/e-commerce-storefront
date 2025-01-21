import React, { createContext, useState, useContext, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "info", // Options: "success", "error", "warning", "info"
    });

    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbarState({ open: true, message, severity });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbarState((prevState) => ({ ...prevState, open: false }));
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={hideSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={hideSnackbar} severity={snackbarState.severity} variant="filled">
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);
