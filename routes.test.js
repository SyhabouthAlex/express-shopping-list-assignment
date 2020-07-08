process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");
let popsicle = {name: "popsicle", price: "1.45"}
let creamsicle = {name: "creamsicle", price: "1.95"}

beforeEach(() => {
    items.push(popsicle);
})

afterEach(() => {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets a list of items", async () => {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual([popsicle]);
    })
})

describe("POST /items", function() {
    test("Adds a new item", async () => {
        const resp = await request(app).post("/items").send(creamsicle);
        expect(resp.statusCode).toBe(201);

        expect(resp.body).toEqual({added: creamsicle});
    })
})

describe("GET /items/:name", function() {
    test("Gets details of an item", async () => {
        const resp = await request(app).get(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual(popsicle);
    })
})

describe("GET /items/:name", function() {
    test("Gets details of an item that doesn't exist", async () => {
        const resp = await request(app).get(`/items/asghgeafga`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("PATCH /items/:name", function() {
    test("Change the details of an item", async () => {
        const resp = await request(app).patch(`/items/${popsicle.name}`).send({name: "snickers"});
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({updated: {name: "snickers", price: popsicle.price}});
    })
})

describe("PATCH /items/:name", function() {
    test("Change the details of an item that doesn't exist", async () => {
        const resp = await request(app).patch(`/items/fgadfsgwargf`).send({name: "snickers"});
        expect(resp.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", function() {
    test("Delete an item", async () => {
        const resp = await request(app).delete(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(items.length).toEqual(0);
    })
})

describe("DELETE /items/:name", function() {
    test("Delete an item that doesn't exist", async () => {
        const resp = await request(app).delete(`/items/sdfasdgwgewr`);
        expect(resp.statusCode).toBe(404);
    })
})