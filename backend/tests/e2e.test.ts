import app from '@src/app'
import request from "supertest";
import {balances} from "@src/services/accounting-software.mock";

describe('server e2e tests', function () {
    it('should get /', async function () {
        await request(app)
            .get('/')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
                expect(res.body).toStrictEqual({msg: 'ok'})
            })
    });

    it('should get /health', async function () {
        await request(app)
            .get('/health')
            .expect(200)
    });

    it('should get /init', async function () {
        await request(app)
            .get('/init')
            .expect(200)
            .then(res => {
                expect(res.body).toStrictEqual({msg: 'Init complete'})
            })
    });

    it('should get /balance', async function () {
        await request(app)
            .get('/balance')
            .expect(200)
            .then(res => {
                expect(res.body).toStrictEqual({data: balances})
            })
    });

    it('should post /loan_request', async function () {
        const payload = {balanceSheet: balances, loanAmount: 5}

        await request(app)
            .post('/loan_request')
            .send(payload)
            .expect(200)
            .then(res => {
                expect(res.body).toStrictEqual({answer: true, assessment: 100})
            })
    });

    it('should have validation error when wrong payload sent to /loan_request', async function () {
        const payload = {something: 'wrong payload'}
        await request(app)
            .post('/loan_request')
            .send(payload)
            .expect(400)
            .then(res => {
                expect(res.body.msg).toContain('Bad request');
                expect(res.body).toHaveProperty('errors')
                expect(res.body.errors).toBeInstanceOf(Array)
                expect(res.body.errors.length).toBeGreaterThan(0)
            })
    });
});
