{% set footer = 'footer lorem ipsum' %}

<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="main.css">
  {% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
  <div class="footer">{{ footer }}</div>
</body>
</html>
