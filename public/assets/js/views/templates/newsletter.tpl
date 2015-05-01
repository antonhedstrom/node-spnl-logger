<td class="number"><%=number%></td>
<td class="date date_start"><%=formatDate(start_time)%></td>
<td class="date date_end"><%=formatDate(end_time)%></td>
<td class="desc" colspan="2">
  <ul class="nav navbar-nav navbar-right navbar-icons">
    <% if ( isLoading ) { %>
      <li class="spinner">
        <span class="fa fa-spinner fa-spin"></span>
      </li>
    <% } %>
    <li class="dropdown hover-only">
      <span class="fa fa-cog dropdown-toggle" data-toggle="dropdown"></span>
      <ul class="dropdown-menu actions">
        <li class="edit">
          <a href="#"><span class="fa fa-pencil-square-o"></span> Edit</a>
        </li>
        <li class="delete">
          <a href="#"><span class="fa fa-times"></span> Delete</a>
        </li>
      </ul>
    </li>
  </ul>


  <%=comment%>
</td>
