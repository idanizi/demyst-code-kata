import {describe, expect, it, vi} from "vitest";
import createMocker from 'vitest-fetch-mock';
import {act, findByText, fireEvent, getByText, render} from "@testing-library/react"
import {App} from "./App.tsx";

// create fetch mock for components that using 'fetch'
const fetchMocker = createMocker(vi);
fetchMocker.enableMocks();

describe('app', function () {
    it('should render', function () {
        render(<App/>)
    });

    it('should have toast notifications container', function () {
        const {container} = render(<App/>)
        // noinspection SpellCheckingInspection
        const element = container.querySelector('div.Toastify')
        // noinspection SpellCheckingInspection
        expect(element).toHaveClass('Toastify')
        expect(element).toBeVisible()
    });

    it('should have browser router', async function () {
        fetchMocker.mockOnce(JSON.stringify({msg: 'Init complete'}))
        const {container} = render(<App/>)
        act(() => {
            fireEvent.click(getByText(container, 'init'))
        })
        const element = await findByText(container, 'Balance')
        expect(element).toBeVisible()
    });
});