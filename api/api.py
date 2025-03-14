import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogs.db'
db = SQLAlchemy(app)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thumbnail = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    catagory = db.Column(db.String(100), nullable=False)
    def __repr__(self):
        return f"Blog(id={self.id}, thumbnail='{self.thumbnail}', title='{self.title}', description='{self.description}', category='{self.category}')"


@app.route('/api/blogs', methods=['GET'])
def get_all_blogs():     
    blogs = Blog.query.all()     
    blog_list = []     
    for blog in blogs:         
        blog_list.append({             
            'id': blog.id,             
            'thumbnail': blog.thumbnail,             
            'title': blog.title,                         
            'description': blog.description,                        
            'category': blog.catagory         
        })     
    return jsonify(blog_list)

@app.route('/api/blogs', methods=['POST'])
def add_blog():
    data = request.get_json()
    required_fields = ['thumbnail', 'title', 'description', 'category']
    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({'error': f"Missing required field: '{field}'"}), 400
    new_blog = Blog(
        thumbnail=data['thumbnail'],
        title=data['title'],
        description=data['description'],
        catagory=data['category']
    )
    db.session.add(new_blog)
    db.session.commit()
    new_blog_data = {
        'id': new_blog.id,
        'thumbnail': new_blog.thumbnail,
        'title': new_blog.title,
        'description': new_blog.description,
        'category': new_blog.catagory
    }
    return jsonify({'message': 'Blog added successfully', 'blog': new_blog_data})

if __name__ == '__main__':
    app.run(debug=True)
