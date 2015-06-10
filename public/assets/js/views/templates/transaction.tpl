<td class="date"><%=formatDate(dateline)%></td>
<td class="amount price"><%=formatSum(amount)%></td>
<td colspan="2" class="comment <% if (!hasComment()) { %>no-content<%}%>">
  <span class="text">
    <%= hasComment() ? comment : 'None' %>
  </span>

  <ul class="nav navbar-nav navbar-right navbar-icons">
    <% if ( isLoading ) { %>
      <li class="spinner">
        <span class="fa fa-spinner fa-spin"></span>
      </li>
    <% } %>
    <% if ( isRecentlyAdded || deletedFail ) { %>
      <li class="labels">
      <% if ( isRecentlyAdded ) { %><span class="label label-info">Added</span><% } %>
      <% if ( deletedFail ) { %><span class="label label-danger">Failed to delete</span><% } %>
      </li>
    <% } %>
    <li class="dropdown hover-only">
      <span class="fa fa-cog dropdown-toggle" data-toggle="dropdown"></span>
      <ul class="dropdown-menu actions">
        <li class="delete">
          <a href="#"><span class="fa fa-times"></span> Delete</a>
        </li>
      </ul>
    </li>
  </ul>
</td>
