const ctx = document.getElementById("grafico1");
// const url = "https://escritha.com/api/v1/users";
const url =
  "https://escritha.com/api/v1/users/get_users_by_created_at?page=1&per_page=20";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZXNjcml0aGEuY29tXC9hcGlcL3YxXC9hdXRoIiwiaWF0IjoxNjk3NDgxMTQ2LCJuYmYiOjE2OTc0ODExNDYsImp0aSI6IkZEdTFRa1JuUlRJamNDN0EiLCJzdWIiOjE4LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.UKoF6T1tNJ8hq_ODwEEdsTKgl1vI3R6hR-FeIDygNEA";
const totalUsers = document.querySelector("#users p");
const onlineUsers = document.querySelector("#masc p");
const pOnlineUsers = document.querySelector("#p");
const qtdeInst = document.querySelector("#femi p");
const namesi = document.querySelector("#namei");

async function getAllUsers() {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let tt = 0;
        let institutions = {};
        // console.log(data.all[0]);
        // console.log(data.all[0].institution);
        for (let i = 0; i < data.all.length; i++) {
          const institutionName = data.all[i].institution;
          if (institutions[institutionName]) {
            institutions[institutionName].push(data.all[i]);
          } else {
            institutions[institutionName] = [data.all[i]];
          }
          tt += 1;
        }

        const institutionsContainer = document.getElementById(
          "institutionsContainer"
        );
        let qtdeI = 0;
        // console.log(institutions.ABCD[0].name);
        // Exibir as instituições com nomes iguais
        for (let institution in institutions) {
          let institutionCount = institutions[institution].length;
          let nomeinstituicao = institution;
          if (institutions[institution].length > 1) {
            const institutionElement = document.createElement("li");
            institutionElement.innerText = `${institution} (${institutionCount})`;
            institutionsContainer.appendChild(institutionElement);
            qtdeI += 1;
          } else {
            const institutionElement = document.createElement("li");
            institutionElement.innerText = `${institution} (${institutionCount})`;
            institutionsContainer.appendChild(institutionElement);
            qtdeI += 1;
          }
        }
        totalUsers.innerText = data.totalElements;
        onlineUsers.innerText = data.onlineCounter;
        porcentagem = (data.onlineCounter * 100) / data.totalElements;
        pOnlineUsers.innerText = porcentagem.toFixed(2) + "%";
        qtdeInst.innerText = qtdeI;
      });
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getAllUsers();

// new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Masculino", "Feminino", "Professores", "Estudantes"],
//     datasets: [
//       {
//         label: "Usuários",
//         data: [3000, 3000, 1000, 5000],
//         borderWidth: 2,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
