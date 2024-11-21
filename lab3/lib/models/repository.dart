class Repository {
  final String name;
  final String owner;
  final String description;
  final String url;
  final int stars;

  Repository({
    required this.name,
    required this.owner,
    required this.description,
    required this.url,
    required this.stars,
  });

  factory Repository.fromJson(Map<String, dynamic> json) {
    return Repository(
      name: json['name'] as String,
      owner: (json['owner'] as Map<String, dynamic>)['login'] as String,
      description: json['description'] as String? ?? 'No description',
      url: json['html_url'] as String,
      stars: json['stargazers_count'] as int,
    );
  }
}
