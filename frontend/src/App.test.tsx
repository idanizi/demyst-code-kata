import {describe, expect, it} from "vitest";
import {render} from "@testing-library/react"
import {App} from "./App.tsx";

describe('app', function () {
    it('should render', function () {
        const result = render(<App />)
        expect(result).to.matchSnapshot()
    });

    it('should have store context', function () {

    });

    it('should have browser router', function () {

    });
});