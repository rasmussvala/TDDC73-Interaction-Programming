import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/repository.dart';

class ApiService {
  static Future<List<Repository>> fetchTrendingRepositories() async {
    final uri = Uri.parse(
        'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=10');

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
}
