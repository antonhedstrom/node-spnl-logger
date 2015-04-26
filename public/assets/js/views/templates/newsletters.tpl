<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">
      Obetalda nummer, <span class="counter"><%=counter%> st</span>
      <span class="sum"><%=formatSum(sum)%> kr</span>
    </h3>
  </div>

  <!-- Table -->
  <table class="table">
    <thead>
      <tr class="add-newsletter">
        <th class="number"><input type="number" name="new-number" placeholder="#"/></th>
        <th class="date date-start"><input type="text" name="new-date-start" /></th>
        <th class="date date-end"><input type="text" name="new-date-end" /></th>
        <th class="desc">
          <input type="text" name="new-desc" placeholder="Description" />
        </th>
        <th class="add">
          <a class="btn btn-success btn-sm btn-add-new">Add</a>
        </th>
      </tr>
      <tr class="headers">
        <th class="number">#</th>
        <th class="date date-start">Start</th>
        <th class="date date-end">End</th>
        <th class="desc" colspan="2">Description</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <div class="panel-footer">
    <span class="counter"><%=counter%> st</span>
    <span class="sum"><%=formatSum(sum)%> kr</span>
  </div>

</div>
