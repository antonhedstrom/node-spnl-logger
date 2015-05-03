
<h1>User profile</h1>

<div class="user-container">
  <div class="user-fields">
    <h2>&nbsp;</h2>
    <div class="form-group">
      <input type="text" value="<%=username%>" class="form-control" disabled placeholder="First name" />
    </div>
    <div class="form-group">
      <input type="text" name="firstname" value="<%=firstname%>" class="form-control" placeholder="First name" />
    </div>
    <div class="form-group">
      <input type="text" name="lastname" value="<%=lastname%>" class="form-control" placeholder="Last name" />
    </div>
  </div>

  <div class="user-password">
    <h2>Password</h2>
    <div class="form-group">
      <input type="password" name="old-password" class="form-control" placeholder="Old password" />
    </div>
    <div class="form-group">
      <input type="password" name="new-password" class="form-control" placeholder="New password" />
      <input type="password" name="new-password2" class="form-control" placeholder="New password again" />
    </div>
  </div>
</div>


<div class="actionbar">
  <div class="notification-container"></div>

  <button class="btn btn-success btn-block">Save</button>
</div>
