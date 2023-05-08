import {describe, it} from "vitest";
import {render, screen} from "@testing-library/react"
import {App} from "./App.tsx";

describe('app', function () {
    it('should render', function () {
        render(<App />)
        screen.debug()
    });

    it.todo('should have store context', function () {

    });

    it.todo('should have browser router', function () {

    });
});