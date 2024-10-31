import { createServer, Model, Response } from "miragejs"

createServer({
  models: {
    processes: Model,
    users: Model
  },

  seeds(server) {
    server.create(
      "process", 
      { 
        id: "1", 
        name: "Mestrado 2025.1", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nisl, sagittis ut hendrerit a, congue sit amet ex. Nam sollicitudin justo sit amet nulla fringilla ultricies. Phasellus efficitur elit at dui luctus molestie. Sed nec lorem non nunc euismod venenatis. Phasellus in tempor est. Donec ex ipsum, maximus sed sapien et, tristique rutrum sapien. Cras neque sapien, pretium lobortis rutrum vitae, varius ut massa. Integer ac mauris non quam rutrum aliquam sit amet aliquet diam. Donec tortor eros, varius et mi eget, iaculis fringilla turpis. Aenean vel scelerisque nulla. Duis venenatis rutrum tortor, nec tincidunt erat scelerisque a. Fusce mi sapien, euismod vel leo at, finibus sodales libero. Quisque blandit congue turpis consequat porttitor. Sed id nulla lorem. Aliquam tristique nec lectus vel feugiat.", 
        startDate: "01/10/2023", 
        endDate: "02/10/2023",
        endAnalysisDate: "20/10/2023" 
      }
    );
    server.create(
      "process", 
      { 
        id: "2", 
        name: "Doutorado 2025.1", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "05/11/2023", 
        endDate: "06/11/2023",
        endAnalysisDate: "20/11/2023" 
      }
    );
    server.create(
      "process", 
      { id: "3", 
        name: "Bolsa Exemplo A", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "10/12/2023", 
        endDate: "11/12/2023",
        endAnalysisDate: "20/12/2023" 
      }
    );
    server.create(
      "process", 
      { 
        id: "4", 
        name: "Bolsa Exemplo B", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "15/01/2024", 
        endDate: "16/01/2024",
        endAnalysisDate: "30/01/2024"  
      }
    );
    server.create(
      "process", 
      { 
        id: "5", 
        name: "Bolsa Exemplo C", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "20/02/2024", 
        endDate: "21/02/2024",
        endAnalysisDate: "05/03/2024"  
      }
    );
    server.create(
      "process", 
      { 
        id: "6", 
        name: "Bolsa Exemplo D", 
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "25/03/2024", 
        endDate: "26/03/2024",
        endAnalysisDate: "10/03/2024"  
      }
    );

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