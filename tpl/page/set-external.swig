{% include '../data/data.swig' %}

<h1>{{ data.title }}</h1>
{% if data.homepage %}
<p>This is homepage</p>
{% endif %}
