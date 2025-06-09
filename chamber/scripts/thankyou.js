document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);

    const fields = [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'email', label: 'Email' },
      { name: 'mobile', label: 'Mobile Phone' },
      { name: 'orgName', label: 'Business/Organization Name' },
      { name: 'timestamp', label: 'Date Submitted' }
    ];
  
    let html = '<ul class="form-review">';
    fields.forEach(field => {
      const value = params.get(field.name) || '<em>Not Provided</em>';
      html += `<li><strong>${field.label}:</strong> ${decodeURIComponent(value)}</li>`;
    });
    html += '</ul>';
  
    document.getElementById('form-data').innerHTML = html;
  });
  