<ul>
    <li><a href="{{$.pages[0]}}">{{$.pages[0]}}</a></li>
    <li><a href="{{$.pages[1]}}">{{$.pages[1]}}</a></li>
    <li><a href="{{$.pages[2]}}">{{$.pages[2]}}</a></li>
    <li><a href="{{$.pages[3]}}">{{$.pages[3]}}</a></li>
</ul>

<ul>
    {% for path in $.pages %}
    <li><a href="{{path}}">{{path}}</a></li>
    {% endfor %}
</ul>
