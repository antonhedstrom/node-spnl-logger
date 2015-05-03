<td class="date"><%=formatDate(dateline)%></td>
<td class="amount price"><%=formatSum(amount)%></td>
<% if ( comment && comment.length > 0 ) { %>
  <td class="comment"><%= comment %></td>
<% } else { %>
  <td class="comment no-content">None</td>
<% } %>
</td>
<td class="actions">&nbsp;</td>
