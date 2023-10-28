const quantidadeUsers = document.getElementById("qu");
const quantidadeInstitutions = document.getElementById("qi");
const quantidadeGraduations = document.getElementById("qg");
const quantidadeMaster = document.getElementById("qm");
const quantidadedoctorate = document.getElementById("qd");
const quantidadSpecialization = document.getElementById("qe");
const quantidadeDefinitionLess = document.getElementById("qsd");
const usersQ1 = document.getElementById("q1");
const qCadastros = document.getElementById("qc");
const containerData = document.getElementById("container-data");
const qCadastrosOntem = document.getElementById("qco");

let userData;

const api =
  "https://escritha.com/api/v1/users/get_users_by_created_at?page=1&per_page=20";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZXNjcml0aGEuY29tXC9hcGlcL3YxXC9hdXRoIiwiaWF0IjoxNjk3NDgxMTQ2LCJuYmYiOjE2OTc0ODExNDYsImp0aSI6IkZEdTFRa1JuUlRJamNDN0EiLCJzdWIiOjE4LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.UKoF6T1tNJ8hq_ODwEEdsTKgl1vI3R6hR-FeIDygNEA";

const fetchData = async () => {
  try {
    const response = await fetch(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userData = await response.json();

    console.log(userData.all.institution);
    processUserData(userData);

    // console.log(userData);
  } catch (error) {
    console.error("Ocorreu um erro ao acessar a API:", error);
  }
};

fetchData();

const processUserData = (data) => {
  let counter = data.all.length;
  quantidadeUsers.innerHTML = counter;
  let counterInstitutions = 0;
  let counterGraduation = 0;
  let counterMaster = 0;
  let counterDoctorate = 0;
  let counterSpecialization = 0;
  let counterDefinitionLess = 0;

  const institutions = new Set(); // Cria um conjunto para armazenar as instituições
  const usersByInstitution = {};

  for (const item of userData.all) {
    const { institution, name, attending } = item;
    if (attending == "graduation") {
      counterGraduation++;
    }
    if (attending == "master") {
      counterMaster++;
    }
    if (attending == "doctorate") {
      counterDoctorate++;
    }

    if (attending == "specialization") {
      counterSpecialization++;
    }

    if (attending == null) {
      counterDefinitionLess++;
    }

    institutions.add(institution); // Adiciona a instituição ao conjunto
    if (usersByInstitution[institution]) {
      usersByInstitution[institution].push(name);
    } else {
      usersByInstitution[institution] = [name];
      counterInstitutions++;
    }
  }
  quantidadeInstitutions.innerHTML = counterInstitutions;
  const sortedInstitutions = Array.from(institutions).sort();

  // Crie uma matriz de pares de valores de instituição e contagem de alunos
  const institutionsArray = [];
  for (let institution in usersByInstitution) {
    institutionsArray.push([
      institution,
      usersByInstitution[institution].length,
    ]);
  }

  // Classifique a matriz com base na contagem de alunos
  institutionsArray.sort((a, b) => b[1] - a[1]);

  // Use as 10 instituições com as contagens mais altas para aplicar um estilo de destaque
  const top10Institutions = institutionsArray.slice(0, 10);

  top10Institutions.forEach((pair) => {
    const [institution, userCount] = pair;
    const institutionBlock = document.createElement("div");
    institutionBlock.textContent = `${institution} - ${userCount} Alunos`;
    institutionBlock.display = "flex";
    institutionBlock.style.backgroundColor = "gray";
    institutionBlock.style.borderRadius = "15px";
    institutionBlock.style.margin = "20px";
    institutionBlock.style.padding = "10px";
    containerData.appendChild(institutionBlock);
  });

  // ============================= GRÁFICO -------------------------

  // Após o loop for onde você obtém a lista das 10 principais instituições, adicione o seguinte código para criar o gráfico de barras:

  const institutionLabels = top10Institutions.map((pair) => pair[0]);
  const studentCounts = top10Institutions.map((pair) => pair[1]);

  const ctx = document.getElementById("top10Institution").getContext("2d");
  const top10InstitutionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: institutionLabels,
      datasets: [
        {
          label: "Total de Pesquisadores",
          data: studentCounts,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // ----------------////////////////////------------------

  sortedInstitutions.forEach((institution) => {
    const institutionTitle = document.createElement("h2");
    const userCount = usersByInstitution[institution].length;
    institutionTitle.textContent = `${institution} - ${userCount} Alunos`;
    containerData.appendChild(institutionTitle);

    const userList = document.createElement("ul");
    userList.style.display = "none";
    usersByInstitution[institution].forEach((userName) => {
      const userItem = document.createElement("li");
      userItem.textContent = userName;
      userList.appendChild(userItem);
    });

    containerData.appendChild(userList);

    quantidadeGraduations.innerHTML = counterGraduation;
    quantidadeMaster.innerHTML = counterMaster;
    quantidadedoctorate.innerHTML = counterDoctorate;
    quantidadSpecialization.innerHTML = counterSpecialization;
    quantidadeDefinitionLess.innerHTML = counterDefinitionLess;

    // ====================== CADASTROS DE HOJE E ONTEM ------------------------
    const dataAtual = new Date();
    let dataOntem = new Date(dataAtual);
    dataOntem.setDate(dataOntem.getDate() - 1);

    let cadastrosOntem = [];
    let cadastrosHoje = [];

    for (let i = 0; i < userData.all.length; i++) {
      const created_at = new Date(userData.all[i].created_at);

      // Verifica se as datas de cadastro correspondem a hoje ou ontem
      if (
        dataOntem.getFullYear() === created_at.getFullYear() &&
        dataOntem.getMonth() === created_at.getMonth() &&
        dataOntem.getDate() === created_at.getDate()
      ) {
        cadastrosOntem.push(userData.all[i]);
      } else if (
        dataAtual.getFullYear() === created_at.getFullYear() &&
        dataAtual.getMonth() === created_at.getMonth() &&
        dataAtual.getDate() === created_at.getDate()
      ) {
        cadastrosHoje.push(userData.all[i]);
      }
    }

    qCadastros.innerHTML = cadastrosHoje.length;
    qCadastrosOntem.innerHTML = cadastrosOntem.length;

    institutionTitle.addEventListener("click", () => {
      if (userList.style.display === "none") {
        userList.style.display = "block";
      } else {
        userList.style.display = "none";
      }
    });
  });
};
