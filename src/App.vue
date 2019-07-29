<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" id="livegradient">
      <!--<b-navbar-brand href="#">NavBar</b-navbar-brand>-->

      <!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

      <!--<b-collapse id="nav-collapse" is-nav>-->
        <!--<b-navbar-nav>-->
          <!--<b-nav-item href="#">Link</b-nav-item>-->
          <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        <!--</b-navbar-nav>-->

        <!--&lt;!&ndash; Right aligned nav items &ndash;&gt;-->
        <!--<b-navbar-nav class="ml-auto">-->
          <!--<b-nav-form>-->
            <!--<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
            <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          <!--</b-nav-form>-->

          <!--<b-nav-item-dropdown text="Lang" right>-->
            <!--<b-dropdown-item href="#">EN</b-dropdown-item>-->
            <!--<b-dropdown-item href="#">ES</b-dropdown-item>-->
            <!--<b-dropdown-item href="#">RU</b-dropdown-item>-->
            <!--<b-dropdown-item href="#">FA</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->

          <!--<b-nav-item-dropdown right>-->
            <!--&lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
            <!--<template slot="button-content"><em>User</em></template>-->
            <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
            <!--<b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->
        <!--</b-navbar-nav>-->
      <!--</b-collapse>-->
      <h4 class="text-white">
        Solaris Medical
      </h4>
      <b-navbar-nav right >
        <b-nav-item-dropdown style="color: #000;" text="Пациенти" >
          <b-dropdown-item href="/patients">Списък</b-dropdown-item>
          <b-dropdown-item href="/patients/create">Запиши нов пациент</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <!--<div style="background-color: azure; height: 6px; box-shadow:  0px 1px 19px gray">-->

    <!--</div>-->

    <br>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#livegradient {
  width: 100wh;
  color: #fff;
  background: linear-gradient(-45deg, #24b313, #E73C7E, #23A6D5, #23D5AB);
  background-size: 400% 400%;
  -webkit-animation: Gradient 20s ease infinite;
  -moz-animation: Gradient 20s ease infinite;
  animation: Gradient 20s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}
</style>
