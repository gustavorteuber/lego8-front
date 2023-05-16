<template>
  <div>
    <!-- Header responsivo -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Seu Logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rota1" class="nav-link">Rota 1</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rota2" class="nav-link">Rota 2</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rota3" class="nav-link">Rota 3</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
