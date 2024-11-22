import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lab3/widgets/repo_page.dart';

import 'models/repository.dart';
import 'services/api_service.dart';

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
    futureRepositories = ApiService.fetchTrendingRepositories();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Trending GitHub Repositories',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Trending GitHub Repositories'),
          backgroundColor: Colors.green,
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
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => const RepoPage()));
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

  // void _openRepository(Repository repo) {
  //   // DO SOMETHING
  // }
}
