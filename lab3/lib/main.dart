import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<List<Repository>> fetchTrendingRepositories() async {
  final uri = Uri.parse(
    'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=10',
  );

  final response = await http.get(uri);

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final items = data['items'] as List<dynamic>;
    return items
        .map((json) => Repository.fromJson(json as Map<String, dynamic>))
        .toList();
  } else {
    throw Exception('Failed to fetch repositories: ${response.reasonPhrase}');
  }
}

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

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<List<Repository>> futureRepositories;

  @override
  void initState() {
    super.initState();
    futureRepositories = fetchTrendingRepositories();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Trending GitHub Repositories',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Trending GitHub Repositories'),
        ),
        body: Center(
          child: FutureBuilder<List<Repository>>(
            future: futureRepositories,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    final repo = snapshot.data![index];
                    return ListTile(
                      title: Text(repo.name),
                      subtitle: Text('By ${repo.owner} • ⭐ ${repo.stars}'),
                      onTap: () {
                        _openRepository(repo);
                      },
                    );
                  },
                );
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
              }

              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }

  void _openRepository(Repository repo) {
    // DO SOMETHING
  }
}
