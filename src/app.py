from flask import Flask, jsonify
from api.swagger import spec
from api.controllers.todo_controller import bp as todo_bp
from api.controllers.auth_controller import auth_bp as auth_bp
from api.middleware import middleware
from infrastructure.databases import init_db
from flask_swagger_ui import get_swaggerui_blueprint

def create_app():
    app = Flask(__name__)
    
    # Đăng ký blueprint
    app.register_blueprint(todo_bp)
    app.register_blueprint(auth_bp)

    # Thêm Swagger UI blueprint
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "Todo API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    # Register middleware
    middleware(app)

    # Đăng ký các path vào apispec (Cần thực hiện trong app_context)
    with app.app_context():
        for rule in app.url_map.iter_rules():
            # Kiểm tra endpoint để thêm vào apispec
            if rule.endpoint.startswith(('todo.', 'course.', 'user.', 'auth.')):
                view_func = app.view_functions.get(rule.endpoint)
                if view_func:
                    print(f"Adding path: {rule.rule} -> {view_func}")
                    spec.path(view=view_func)
            
    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)