<nav class="navbar navbar-inverse" role="navigation">

  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2"><span class="fa fa-bars"></span></button>
    <img class="logo" src="/assets/img/spnl_logo.png" />
  </div>

  <div class="collapse navbar-collapse" id="navbar-collapse-2">
    <ul class="nav navbar-nav">
      <li class="active"><a href="#home">Home</a></li>
      <li><a href="#stats">Statistics</a></li>
      <li><a href="#payments">Payments</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right navbar-icons">
      <li class="dropdown">
        <a href="#fakeLink" class="dropdown-toggle" data-toggle="dropdown">
          <span class="user-name-full"><%= getFullName() %></span>
          <span class="fa fa-chevron-down fa"></span>
        </a>
        <ul class="dropdown-menu">
          <div class="arrow top"></div>
          <li>
            <a href="#profile"><span class="fa fa-user"></span>Profile</a>
          </li>
          <li>
            <a href="/logout"><span class="fa fa-sign-out"></span>Log out</a>
          </li>
        </ul>
      </li>
      <!--
      <li>
        <a href="#">
          <span class="fa fa-cog"></span><span class="hidden-lg">Settings</span>
        </a>
      </li>
      -->
    </ul>

    <!-- <p class="navbar-text navbar-right">Heigh-ho, <a href="#" class="navbar-link"><%= getFullName() %></a></p> -->
  </div>
</nav>
