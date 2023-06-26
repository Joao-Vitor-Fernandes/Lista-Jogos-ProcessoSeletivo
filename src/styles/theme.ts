import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    breakpoints: {
        sm: "30em",
        xs: "34em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
    },
    styles: {
        global: {
            body: {
                bg: "linear-gradient(352deg, rgba(49,107,226,1) 8%, rgba(8,1,4,1) 55%)",
                color: "white",
            },
        },
    },
});