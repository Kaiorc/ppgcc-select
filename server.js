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
        places: 20,
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nisl, sagittis ut hendrerit a, congue sit amet ex. Nam sollicitudin justo sit amet nulla fringilla ultricies. Phasellus efficitur elit at dui luctus molestie. Sed nec lorem non nunc euismod venenatis. Phasellus in tempor est. Donec ex ipsum, maximus sed sapien et, tristique rutrum sapien. Cras neque sapien, pretium lobortis rutrum vitae, varius ut massa. Integer ac mauris non quam rutrum aliquam sit amet aliquet diam. Donec tortor eros, varius et mi eget, iaculis fringilla turpis. Aenean vel scelerisque nulla. Duis venenatis rutrum tortor, nec tincidunt erat scelerisque a. Fusce mi sapien, euismod vel leo at, finibus sodales libero. Quisque blandit congue turpis consequat porttitor. Sed id nulla lorem. Aliquam tristique nec lectus vel feugiat.", 
        startDate: "01/10/2023", 
        endDate: "02/10/2023",
        endAnalysisDate: "20/10/2023",
        registrationFieldsInfo: [
          {
            name: "Nome Completo",
            type: "text",
            required: true
          },
          {
            name: "Diploma de Graduação",
            type: "document",
            required: true
          },
          {
            name: "Histórico Escolar",
            type: "document",
            required: true
          },
          {
            name: "Curriculum Vitae Lattes",
            type: "document",
            required: true
          },
          {
            name: "Carta de Recomendação",
            type: "document",
            required: false
          },
          {
            name: "Projeto de Pesquisa",
            type: "document",
            required: true
          },
          {
            name: "Comprovante de Proficiência em Língua Estrangeira",
            type: "document",
            required: false
          }
        ],
        applications: [
          {
            
          }          
        ]
      }
    );
    server.create(
      "process", 
      { 
        id: "2", 
        name: "Doutorado 2025.1", 
        places: 10,
        miniDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
        startDate: "05/11/2023", 
        endDate: "06/12/2023",
        endAnalysisDate: "20/12/2023" 
      }
    );
    server.create(
      "process", 
      { id: "3", 
        name: "Bolsa Exemplo A", 
        places: 25,
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
        places: 16,
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
        places: 22,
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
        places: 12,
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
    
    // Permitir que as requisições para o Firestore passem
    this.passthrough("https://firestore.googleapis.com/**")

    // Permitir que as requisições para o Firebase Auth passem
    this.passthrough("https://identitytoolkit.googleapis.com/**")
    this.passthrough("https://securetoken.googleapis.com/**")

    // Permitir que as requisições para o Appwrite passem
    this.passthrough("https://cloud.appwrite.io/**");

    // Permitir que as requisições para o Cloudinary passem
    this.passthrough("https://api.cloudinary.com/**")

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