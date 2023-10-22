const quantidadeUsers = document.getElementById("qu");
const quantidadeInstitutions = document.getElementById("qi");
const quantidadeGraduations = document.getElementById("qg");
const quantidadeMaster = document.getElementById("qm");
const quantidadedoctorate = document.getElementById("qd");
const quantidadSpecialization = document.getElementById("qe");
const quantidadeDefinitionLess = document.getElementById("qsd");
const usersQ1 = document.getElementById("q1");
const containerData = document.getElementById("container-data");

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
    institutionBlock.style.backgroundColor = "rgb(45, 133, 133)";
    institutionBlock.style.padding = "10px";
    containerData.appendChild(institutionBlock);
  });

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

    institutionTitle.addEventListener("click", () => {
      if (userList.style.display === "none") {
        userList.style.display = "block";
      } else {
        userList.style.display = "none";
      }
    });
  });
};
