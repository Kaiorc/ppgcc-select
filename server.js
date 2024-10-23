import { createServer, Model, Response } from "miragejs"

createServer({
  models: {
    processes: Model,
    users: Model
  },

  seeds(server) {
    server.create("process", { id: "1", name: "Mestrado 2025.1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "01/10/2023", endDate: "02/10/2023" });
    server.create("process", { id: "2", name: "Doutorado 2025.1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "05/11/2023", endDate: "06/11/2023" });
    server.create("process", { id: "3", name: "Bolsa Exemplo A", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "10/12/2023", endDate: "11/12/2023" });
    server.create("process", { id: "4", name: "Bolsa Exemplo B", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "15/01/2024", endDate: "16/01/2024" });
    server.create("process", { id: "5", name: "Bolsa Exemplo C", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "20/02/2024", endDate: "21/02/2024" });
    server.create("process", { id: "6", name: "Bolsa Exemplo D", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", startDate: "25/03/2024", endDate: "26/03/2024" });

    // server.create("user", { id: "123", email: "b@b.com", password: "p123", name: "Bob" })
  },

  routes() {
    this.namespace = "api"

    this.get("/processes", (schema, request) => {
      // return new Response(400, {}, {error: "Error fetching data"})
      return schema.processes.all()
    })

    this.get("/processes/:id", (schema, request) => {
      const id = request.params.id
      return schema.processes.find(id)
    })
  }
})