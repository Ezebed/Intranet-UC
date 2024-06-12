import React from "react"
import {render, screen, waitFor} from "@testing-library/react"
import '@testing-library/jest-dom';

import Alert from "./Alert"

describe("<Alert />", () => {
   

    test("render component", () => {
        render(<Alert message="Esta es una alerta que desaparece a los pocos segundos" severity="success"/>)

        const element = screen.getByText(/alerta que desaparece/i)

        expect(element).toBeInTheDocument()
    })

    test("render success color", () => {
        render(<Alert message="Esta es una alerta que desaparece a los pocos segundos" severity="success"/>)

        const dialog = screen.getByRole("alert")

        expect(dialog.className).toMatch(/MuiAlert-colorSucces/)
    })

    test("render error color", () => {
        render(<Alert message="Esta es una alerta que desaparece a los pocos segundos" severity="error"/>)

        const dialog = screen.getByRole("alert")

        expect(dialog.className).toMatch(/MuiAlert-colorError/)
    })
})