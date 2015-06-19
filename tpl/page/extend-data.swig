{% extends '../layout-data.swig' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="custom{% if !env.dev %}.min{% endif %}.css">
{% endblock %}

{% block content %}
<p>This is just an awesome page.</p>
{% endblock %}
