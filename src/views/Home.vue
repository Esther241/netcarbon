<template>
  <div class="home-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <h1>Netcarbon</h1>
          <p class="description">
            Explorez Paris sous un nouvel angle grâce à notre dashboard
            interactif qui combine innovation et écologie. Visualisez les
            espaces verts, les arbres et identifiez les îlots de chaleur en un
            clin d'œil grâce à une carte dynamique alimentée par l'API
            OpenStreetMap. Notre plateforme vous offre un outil intuitif pour
            mieux comprendre et agir sur l’environnement urbain. Découvrez Paris
            autrement et participez à la préservation de son patrimoine naturel
            !
          </p>
          <v-btn
            color="teal-lighten-1"
            class="mt-4"
            large
            @click="goToDashboard"
          >
            Accéder au dashboard
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    goToDashboard() {
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
  font-family: "Raleway", sans-serif;
  color: #287f71;
  margin-bottom: 1rem;
}
.description {
  font-size: 1.2rem;
  font-family: "Open Sans", sans-serif;
  color: #5a5a5a;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: start;
  width: 120vh;
}
.v-btn {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: none;
}
</style>
